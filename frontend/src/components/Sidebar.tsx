import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import './Sidebar.css'

const categories = [
  '事務',
  'エンジニア',
  '営業',
  'デザイン',
  'マーケティング',
  '財務・総務',
  '人事',
  'カスタマーサポート',
  '製造',
  '医療・介護',
]

type SidebarProps = {
  selectedCategories: string[]
  setSelectedCategories: Dispatch<SetStateAction<string[]>>
  minimumSalary: number
  setMinimumSalary: Dispatch<SetStateAction<number>>
}

export default function Sidebar({
  selectedCategories,
  setSelectedCategories,
  minimumSalary,
  setMinimumSalary,
}: SidebarProps) {
  const handleCategoryChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const category = evt.target.value
    const isChecked = evt.target.checked

    if (isChecked) {
      setSelectedCategories((currentCategories) => [
        ...currentCategories,
        category,
      ])
    } else {
      setSelectedCategories((currentCategories) =>
        currentCategories.filter(
          (currentCategory) => currentCategory !== category
        )
      )
    }
  }

  const handleSalaryChange = (
    evt: ChangeEvent<HTMLSelectElement>
  ) => {
    setMinimumSalary(Number(evt.target.value))
  }

  return (
    <aside className="sidebar">
      <h2>求人カテゴリ</h2>

      <div className='category-list'>
        {categories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          {category}
        </label>
      ))}
      </div>

      <h2>年収</h2>

      <select
        value={minimumSalary}
        onChange={handleSalaryChange}
      >
        <option value="0">指定なし</option>
        <option value="300" selected>300万円以上</option>
        <option value="400">400万円以上</option>
        <option value="500">500万円以上</option>
        <option value="600">600万円以上</option>
        <option value="700">700万円以上</option>
        <option value="800">800万円以上</option>
      </select>
    </aside>
  )
}