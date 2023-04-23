import './Menu.css'
import { Link } from 'react-router-dom'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'
import { BiPause } from 'react-icons/bi'
import getSpotifyData from '../Helpers/getSpotifyData'

export default function Menu({ setChoice, token, currentList, play, setPlay }) {
    var local = window.location.href.split('/')
    local = local[local.length - 1]
    const [path, setPath] = useState(local ? "/" + local : 'liked')
    const [apiUrl, setPlaylistApiUrl] = useState('https://api.spotify.com/v1/me/playlists')
    const [playlists, setPlaylists] = useState([])
    const [speaker, setSpeaker] = useState(<HiOutlineSpeakerWave size={15} color='#1ed760' />)

    useEffect(() => {
        if (token) {
            getSpotifyData(token, apiUrl).then(resp => {
                setPlaylists(resp.items)
                setPlaylistApiUrl(resp?.next)
            })
        }
    }, [token, apiUrl])
    return (
        <nav className='nav_bar'>
            <div className="logo">
                Spotify
            </div>
            <div className="static_menu">
                <ul>
                    <li>Início</li>
                    <li 
                    className={`${path == 'search' ? 'active' : ''} `}
                    onClick={() => {
                        setPath('search')
                    }}
                    ><Link to="/search">Buscar</Link></li>
                    <li 
                    className={`${path == 'library' ? 'active' : ''} `}
                    onClick={() => {
                        setPath('library')
                    }}
                    ><Link to="/library/Playlists">Sua Biblioteca</Link></li>
                </ul>
            </div>
            <div className="createFav">
                <ul>
                    <li>Criar Playlist</li>
                    <li className={`${path == 'liked' ? 'active' : ''} `}>
                        <Link
                            to='/'
                            onClick={() => {
                                setPath('liked')
                            }}
                        >Músicas Curtidas</Link>
                    </li>
                </ul>
            </div>
            <div className="user_playlists">
                <ul>
                    {playlists.map(playlist => {
                        return (
                            playlist.name ?
                                <li key={playlist.name} className={`${path == "/" + playlist.id ? 'active' : ''} `} >
                                    <Link to={`/${playlist.id}`}
                                        title={playlist.name}
                                        onClick={() => {
                                            setPath("/" + playlist.id)
                                            setChoice([playlist])

                                        }}
                                    >
                                        {playlist.name}
                                    </Link>
                                    {currentList === playlist.id && play ?
                                        <button className="current_list_btn"
                                            onMouseEnter={() => setSpeaker(<BiPause size={20} color="#a7a7a7"/>)}
                                            onMouseLeave={() => setSpeaker(<HiOutlineSpeakerWave size={15} color='#1ed760' />)}
                                            onClick={() => setPlay(false)}
                                        >
                                            {speaker}

                                        </button>
                                        : ''}
                                </li>

                                : ''
                        )
                    })}
                </ul>
            </div>
            <div className='download'>
                <MdOutlineDownloadForOffline size={25} /> Instalar aplicativo
            </div>
        </nav>
    )
}