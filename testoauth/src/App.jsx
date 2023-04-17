import { useEffect, useState } from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import './App.css';

import Collection from './components/Collection';
import Menu from './components/Menu';
import SpotifyPlayer from 'react-spotify-web-playback';


const clientid = '5afe486064b145c6a8c852bd53deea04'
const redirect = process.env.REACT_APP_REDIRECT_URI
const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read playlist-read-private'
const state = Math.floor(Math.random() * 10^3)
const authLink = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientid}&scope=${scope}&redirect_uri=${redirect}&state=${state}`
const baseURL = process.env.REACT_APP_BASE_URL

function App() {
  const {state} = useLocation()
  const [token, setToken] = useState()
  const [musics, setMusics] = useState([])
  const [selectedMusic, setSelected] = useState([])
  const [playlistApiUrl, setPlaylistApiUrl] = useState("https://api.spotify.com/v1/me/playlists")
  const [playlist, setPlaylist] = useState([])
  const [currentTrack, setCurrent] = useState()
  const [play, setPlay] = useState(true)
  const [playlists, setPlaylists] = useState([])
  const [choice, setChoice] = useState('')
  
  useEffect(()=>{
    if(localStorage.getItem("refreshToken")){
      let code = localStorage.getItem("refreshToken")
      fetch(baseURL+"/refresh/"+code)
      .then(resp => resp.json())
      .then(resp => {
        //console.log("Token: ", resp)
        setToken(resp)
      })
      .catch(err => console.log(err))
    }else{
      if(state){
        fetch(baseURL+"/code/"+state.code)
        .then(resp => resp.json())
        .then(resp => {
          //console.log(resp)
          setToken(resp.access_token)
          localStorage.setItem("refreshToken", resp.refresh_token)
        } )
        .catch(err => console.log(err))
      }
    }
  }, [state])

  

  useEffect(()=>{
    if(token){
      fetch(playlistApiUrl,{
        method: "GET",
        headers :{
            'Authorization': 'Bearer '+token
        } 
    })
    .then(resp => resp.json())
    .then(resp => {
      setPlaylists(resp.items)
      resp.next ? setPlaylistApiUrl(resp.next) : setPlaylistApiUrl(playlistApiUrl)
        
    })
    .catch(err => console.log(err))
    }
  }, [token, playlistApiUrl])

  return (
    <div>
      <div className='screen'>
      <Menu playlists={playlists} setChoice={(e)=> setChoice(e)}/> 
      <Routes>
        <Route path='/'>
          <Route path="" element={
            <Collection
            token={token} 
            playlist={playlist}
            musics={musics} 
            setMusics = {(e) => setMusics(e)}
            setPlaylist = {(e) => setPlaylist(e)}
            setSelected={ (e) => setSelected(e)}
            authLink = {authLink}
            currentTrack={currentTrack}
            play={play}
            setPlay={(e)=> setPlay(e)}
            currentList={[{name: "Musicas Curtidas", owner: {display_name:  "current_user", external_urls: ""}, images: ['', 'placeholder']}]}

          />} />
          <Route path=":collectionType" element={            
            <Collection
            token={token} 
            playlist={playlist}
            musics={musics} 
            setMusics = {(e) => setMusics(e)}
            setPlaylist = {(e) => setPlaylist(e)}
            setSelected={ (e) => setSelected(e)}
            authLink = {authLink}
            currentTrack={currentTrack}
            play={play}
            setPlay={(e)=> setPlay(e)}
            currentList={choice}
          />} />
        </Route>
        <Route path='/callback' element={<Callback />}/>
      </Routes>
      </div>
    
      <div className="player">
          <SpotifyPlayer 
            callback={(e) => {
              //console.log(e)
              setCurrent(e.track.uri)
            }}
            token={token}
            uris={selectedMusic}
            initialVolume={0.1}
            inlineVolume={true}
            play={play}
            layout="responsive"
            styles={{
              bgColor: "#181818",
              color: "white",
              trackNameColor: "white",
              trackArtistColor: "grey"
            }}
          /> 
        </div>
    </div>
  );
}


function Callback(){
  const navigate = useNavigate()

  var q = window.location.search.split("&")
  q = q[0].split("=")
  q = q[1]
  console.log("Tá aqui")
  useEffect(() =>{
    navigate("/", {state: {code: q}})
  }, [])
}
export default App;
