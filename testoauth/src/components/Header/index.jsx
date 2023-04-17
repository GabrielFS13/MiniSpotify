import { useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ token, currentList, listCount, authLink }) {

    //console.log(currentList[0])
    const [color, setColor] = useState()
    const navigate = useNavigate()
    //getUser info

    //getPlaylistinfo
    return (
        <header>
            <nav className='header_nav'>
                <div className="navButtons">
                    <ul>
                        <li><Link to={''}>Voltar</Link></li>
                        <li><Link to={''}>Avançar</Link></li>
                    </ul>
                </div>
                <div className="user_infos">
                    {"User Info"}
                    <a href={authLink}>Logar</a>
                </div>
            </nav>
            <div className="play_playlist">
                <div className="img">
                    <img src={currentList[0].images.length > 1 ? currentList[0]?.images[1]?.url : currentList[0]?.images[0]?.url} alt={currentList[0].name} desc={currentList[0].description} />
                </div>
                <div className="infos">
                    <span>Playlist</span>
                    <h1 style={currentList[0].name.length > 28 ? { fontSize: "2rem" } : {}} >{currentList[0].name}</h1>
                    <div className="userListInfos">
                        <div className="userInfos">
                            <div className="user_img">

                            </div>
                            <a href={currentList[0].owner.external_urls.spotify} target="_blank" rel="noopener noreferrer">{currentList[0].owner.display_name}</a>
                        </div>
                        <div className="listCount">
                            {listCount}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}