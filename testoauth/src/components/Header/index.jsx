import './Header.css'
import { Link, useParams } from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'
import { useEffect, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { SlArrowLeft, SlArrowRight} from 'react-icons/sl'
export default function Header({ token, listCount, authLink, setColor }) {

    const { collectionType } = useParams()
    const [currentUser, setCurrentUser] = useState()
    // getUser info
    useEffect(() => {
        if (token) {
            fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(resp => resp.json())
                .then(resp => {
                    setCurrentUser(resp)
                })
                .catch(err => console.log(err))
        }
    }, [token])
    // getPlaylistinfo
    const [playlistInfos, setPlaylistInfos] = useState()

    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/playlists/${collectionType}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (collectionType) {
                        setPlaylistInfos({ ...resp })
                    } else {
                        setPlaylistInfos({
                            name: "Músicas Curtidas",
                            owner: {
                                display_name: "current_user",
                                external_urls: {
                                    spotify: 'current user url'
                                }
                            },
                            images: ['', { url: './curtidas.png' }],
                            description: '',
                            followers: {
                                total: null
                            }
                        })
                    }
                })
                .catch(err => console.log(err))
                .finally(e => console.log(e))
        }
    }, [token, collectionType])
    function formatHour(count) {
        var totMinutos = Math.floor(count * 3.5)
        var horas = Math.floor(totMinutos / 60)
        var minutos = totMinutos % 60
        return ` cerca de ${horas}h ${minutos}min`
    }

    return (
        playlistInfos && currentUser ? <header>
            <nav className='header_nav'>
                <div className="navButtons">
                    <ul className='nav_links'>
                        <li><Link to={''}><SlArrowLeft /></Link></li>
                        <li><Link to={''}><SlArrowRight /></Link></li>
                    </ul>
                </div>
                <div className="user_infos">
                    <div className="userModal">
                        <div className="user_img">
                            <img src={currentUser.images[0].url} alt={currentUser.display_name} />
                        </div>
                        {currentUser.display_name}
                        <AiFillCaretDown />
                    </div>
                </div>
            </nav>
            <div className="play_playlist">
                <div className="img">
                    <ColorExtractor rgb getColors={colors => setColor(
                        { backgroundImage: `linear-gradient(rgba(${colors[0][0]},${colors[0][1]},${colors[0][2]}, 1) 10px, #121212 550px)` }
                    )}>
                        <img src={playlistInfos.images.length > 1 ? playlistInfos?.images[1]?.url : playlistInfos?.images[0]?.url} alt={playlistInfos.name} desc={playlistInfos.description} />
                    </ColorExtractor>
                </div>
                <div className="infos">
                    <span>Playlist</span>
                    <h1 style={playlistInfos.name.length > 28 ? { fontSize: "2rem" } : {}} >{playlistInfos.name}</h1>
                    <div className="userListInfos">
                        <div className="userInfos">
                            <div className="user_img">
                                <div className="userIMG">
                                    <img alt="Owner IMG" />
                                </div>
                            </div>
                            <a
                                href={playlistInfos.owner.external_urls.spotify}
                                target="_blank" rel="noopener noreferrer"
                                className='owner_name'
                            >{playlistInfos.owner.display_name}</a>
                            {collectionType ?
                                <ul className='playlist_infos'>
                                    <li>
                                        {playlistInfos?.followers.total} curtidas
                                    </li>
                                    <li>
                                        {listCount} Músicas,
                                    </li>
                                    <p className='hour_avg'>
                                        {formatHour(listCount)}
                                    </p>
                                </ul>
                                : listCount + " Músicas"}
                        </div>
                    </div>
                </div>
            </div>
        </header>
            : !token ? <a href={authLink}>Logar</a> : ''
    )
}