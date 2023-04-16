import { useState } from 'react'
import './Header.css'

export default function Header({token, currentList, listCount}){
    
    const [color, setColor] = useState()
    //getUser info

    //getPlaylistinfo
    return (
        <header>
            <nav className='header_nav'>
                <div className="navButtons">
                    <ul>
                        <li><button to={(e) => ''}>Voltar</button></li>
                        <li><button to={(e) => ''}>Avançar</button></li>
                    </ul>
                </div>
                <div className="user_infos">
                    {"User Info"}
                </div>
            </nav>
            <div className="play_playlist">
                 <div className="img">
                    
                 </div>
                 <div className="infos">
                    <span>Playlist</span>
                    <h1 style={currentList.length > 20 ? {fontSize: 2+"rem"} : {}} >{currentList}</h1>
                    <div className="userListInfos">
                        <div className="userInfos">
                            {"User Infos "}
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