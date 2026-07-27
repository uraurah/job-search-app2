import { Link } from 'react-router'
import './Header.css'


export default function Header() {
    return (
        <header className="header">
            <h1>求人検索アプリ</h1>
            <nav>
                <ul>
                    <li><Link to="/">求人検索</Link></li>
                    <li><Link to="/jobs/new">求人投稿</Link></li>
                </ul>
            </nav>
        </header>
    )
}