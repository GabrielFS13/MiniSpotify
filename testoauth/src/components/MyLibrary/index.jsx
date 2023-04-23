import { useState, useEffect } from "react";
import HeaderNav from "../HeaderNav";
import './MyLibrary.css'
import getSpotifyData from "../Helpers/getSpotifyData";
import { Link, useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import PlaylistsComponent from "./PlaylistsComponent";
import PodcastComponent from "./PodcastsComponent";
import ArtistsComponent from "./ArtistsComponent";
import AlbumComponent from "./AlbumsComponent";

export default function MyLibrary({ token }) {
    const { type } = useParams()
    const [selected, setSelected] = useState(type)
    const [apiPaylistApi, setPlaylsitApi] = useState('https://api.spotify.com/v1/me/playlists')
    const [albumApi, setAlbumApi] = useState('https://api.spotify.com/v1/me/albums')
    const [podCastsApi, setPodcastApi] = useState("https://api.spotify.com/v1/me/shows")
    const [artistasApi, setArtistasApi] = useState("https://api.spotify.com/v1/me/following?type=artist")
    const [playlistInfos, setPlaylistInfos] = useState([])
    const [albumsInfos, setAlbumsInfos] = useState([])
    const [artistasInfos, setArtistasInfos] = useState([])
    const [podCastInfos, setPodcastinfos] = useState([])


    useEffect(() => {
        setSelected(type)
        if (token && type == 'Playlists') {
            getSpotifyData(token, apiPaylistApi).then(resp => {
                setPlaylistInfos(resp.items)
                setPlaylsitApi(resp?.next)
            })
        } else if (token && type == 'Podcasts') {
            //getPodcasts
            getSpotifyData(token, podCastsApi).then(resp => {
                setPodcastinfos(resp.items)
                setPodcastApi(resp?.next)

            })
        } else if (token && type == 'Artistas') {
            //Artistas
            getSpotifyData(token, artistasApi).then(resp => {
                setArtistasInfos(resp.artists.items)
                setArtistasApi(resp?.next)
            })
        } else if (token && type == 'Albums') {
            //Albums
            getSpotifyData(token, albumApi).then(resp => {
                setAlbumsInfos(resp.items)
                setAlbumApi(resp?.next)
            })
        }
    }, [token, type])

    return (
        <div className="App">
            <header className="library_header">
                <HeaderNav token={token} buttons={['Playlists', 'Podcasts', 'Artistas', 'Albums']} />
            </header>
            <main className="show_items">
                <div className="selected_item">
                    <h1>{selected}</h1>
                </div>
                <div className="items">
                    {type == 'Artistas' || type == 'Albums' ? '' :
                        <div className="firtsItem">

                        </div>
                    }
                    {type == 'Playlists' ? <PlaylistsComponent infos={playlistInfos} /> : ''}
                    {type == 'Podcasts' ? <PodcastComponent infos={podCastInfos} /> : ''}
                    {type == 'Artistas' ? <ArtistsComponent infos={artistasInfos} /> : ''}
                    {type == 'Albums' ? <AlbumComponent infos={albumsInfos} /> : ''}

                </div>
                <div className="footer" id="footer"></div>
            </main>
        </div>
    )
}