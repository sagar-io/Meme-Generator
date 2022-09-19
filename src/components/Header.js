import logo from '../images/trollface.png'

export default function Header() {
    return (
        <header className = "main-header">
            <img className = "header--logo" src = {logo}/>
            <h1 className = "header--heading">Generate Your Own Meme</h1>
        </header>
    )
}