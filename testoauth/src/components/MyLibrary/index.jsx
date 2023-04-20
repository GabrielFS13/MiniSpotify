import { useState, useEffect } from "react";
import HeaderNav from "../HeaderNav";
import './MyLibrary.css'
import getPlaylists from "../Helpers/getPlaylists";
import { Link, useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";

export default function MyLibrary({ token }) {
    const {type} = useParams()
    const [selected, setSelected] = useState(type)
    const [apiUrl, setApiurl] = useState('https://api.spotify.com/v1/me/playlists')
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (token) {
            getPlaylists(token, apiUrl).then(resp => {
                setPlaylists(resp.items)
                setApiurl(resp?.next)
            })
        }
    }, [token, apiUrl])

    return (
        <div className="App">
            <header className="library_header">
                <HeaderNav token={token} buttons={['Playlists', 'Podcasts', 'Artistas', 'Álbuns']} />
            </header>
            <main className="show_items">
                <div className="selected_item">
                    <h1>{selected}</h1>
                </div>
                <div className="items">
                    <div className="firtsItem">

                    </div>
                    {playlists.map((playlist, i) => {
                        return (
                            <Link 
                                to={`/${playlist.id}`} key={i}>
                                <div className="card">
                                    <div className="card_img">
                                        <img src={playlist.images[0]?.url} alt={playlist.name} />
                                    </div>
                                    <div className="card_infos">
                                        <div className="card_playlist_title">
                                            {playlist.name}
                                        </div>
                                        <div className="card_playlist_owner">
                                            {playlist.description ? playlist.description : "De " + playlist.owner.display_name}
                                        </div>
                                        <div className="card_btn">
                                            <BsFillPlayFill size={30} color="black" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}

                </div>
                <div  className="footer" id="footer"></div>
            </main>
        </div>
    )
}