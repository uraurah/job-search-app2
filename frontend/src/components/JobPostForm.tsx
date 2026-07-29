import {useState} from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import type { JobFormData } from '../types/job'
import './JobPostForm.css'

export default function JobPostForm() {
    const API_URL = import.meta.env.VITE_API_URL

    const [formData, setFormData] = useState<JobFormData>({
        category:'', 
        salary:'', 
        title:''
    });

    const handleChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const fieldName = evt.target.name;
        const value =evt.target.value; 
        setFormData((currData) => {
            return {...currData, [fieldName]: value};
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async(
        evt: SubmitEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        const submitData = {
            ...formData,
            salary: Number(formData.salary)
        }

        console.log('送信開始:', submitData)

        try{
            const response = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job: submitData,
                }),
            })

            const data = await response.json()

            console.log('ステータス:', response.status)
            console.log('Railsからの返答:', data)

            if (!response.ok) {
                console.error('求人の投稿に失敗しました')
                return
            }

            console.log('投稿成功。画面移動します')
            navigate('/')
            } catch (error) {
            console.error('Railsサーバーに接続できませんでした', error)
            }
        }



    return (
        <form className="job-post-form" onSubmit={handleSubmit}>
            <h2>求人投稿</h2>

            <div className="form-group-small">
                <label htmlFor="category" >求人カテゴリ選択</label>
                <select
                    className="form-group-small"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">カテゴリを選択 ▼</option>
                    <option value="事務">事務</option>
                    <option value="エンジニア">エンジニア</option>
                    <option value="営業">営業</option>
                    <option value="デザイン">デザイン</option>
                    <option value="マーケティング">マーケティング</option>
                    <option value="財務・総務">財務・総務</option>
                    <option value="人事">人事</option>
                    <option value="カスタマーサポート">カスタマーサポート</option>
                    <option value="製造">製造</option>
                    <option value="医療・介護">医療・介護</option>

                </select>
            </div>
            
            <div className="form-group-small">
                <label htmlFor="salary">年収（万円）</label>
                <input 
                    className="form-group-small"
                    id="salary" 
                    name="salary"
                    type="number" 
                    min="1"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="title">求人タイトル</label>
                <input 
                    className="form-group"
                    id="title"
                    name="title"
                    type="text" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">投稿</button>
        </form>
    )
}