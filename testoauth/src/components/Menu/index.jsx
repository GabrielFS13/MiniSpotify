import './Menu.css'
import { Link } from 'react-router-dom'
import {MdOutlineDownloadForOffline} from 'react-icons/md'
import { useState } from 'react'

export default function Menu({playlists, setChoice}){
    var local = window.location.href.split('/')
    local = local[local.length-1]
    const [path, setPath] = useState(local ? "/"+local : 'liked')

    return(
        <nav className='nav_bar'>
            <div className="logo">
                Spotify
            </div>
            <div className="static_menu">
                <ul>
                    <li>Início</li>
                    <li>Buscar</li>
                    <li>Sua Biblioteca</li>
                </ul>
            </div>
            <div className="createFav">
                <ul>
                    <li>Criar Playlist</li>
                    <li className={`${path == 'liked'  ? 'active' : ''} `}>
                        <Link 
                        to='/' 
                        onClick={() => setPath('liked')}
                        >Músicas Curtidas</Link>
                    </li>
                </ul>
            </div>
            <div className="user_playlists">
                <ul>
                    {playlists.map(playlist => {
                    return(
                        playlist.name ? 
                        <li key={playlist.name} className={`${path == "/"+playlist.id ? 'active' : ''} `} > 
                            <Link to={`/${playlist.id}`} 
                            title={playlist.name}
                            onClick={() => {
                                setPath("/"+playlist.id)
                                setChoice(playlist.name)
                                
                            }}
                            > 
                            {playlist.name} 
                            </Link>
                        </li> : ''
                    )})}
                </ul>   
            </div>
            <div className='download'>
                <MdOutlineDownloadForOffline size={25}/> Instalar aplicativo
            </div>
        </nav>
    )
}