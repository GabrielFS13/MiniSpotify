import { useEffect, useState } from "react";
import {BsFillPlayFill, BsSoundwave  } from 'react-icons/bs'
import {BiPause} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'
import './Collection.css'
import { useParams } from "react-router-dom";
import Header from "../Header";

function Collection({token, setPlay, musics, setSelected, currentList, playlist, currentTrack, play, setPlaylist, setMusics, authLink}){

  const [apiUrl, setApiUrl] = useState("https://api.spotify.com/v1/me/tracks")
  const {collectionType} = useParams()
  const [listLen, setLen] = useState(0)
  const [hover, setHover] = useState({i: null, hover: null})


  useEffect(()=>{
    if(collectionType){
      //pega o id da playlist
      //chama aq `https://api.spotify.com/v1/playlists/${playlist_id}`
      setApiUrl(`https://api.spotify.com/v1/playlists/${collectionType}`)
    }else{
      setApiUrl("https://api.spotify.com/v1/me/tracks")
    }
    setMusics([])
    setPlaylist([])
    setLen(0)
  }, [collectionType])


    useEffect(()=>{
      fetch(apiUrl, {
          method: "GET",
          headers :{
              'Authorization': 'Bearer '+token
          }
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.type === 'playlist'){
          setMusics([...musics, ...resp?.tracks?.items])
          setPlaylist([...musics.map(music => music.track.uri)])
          setApiUrl(resp?.next)
          setLen(resp.tracks.total)
          //console.log(resp)
        }else{
          setMusics([...musics, ...resp?.items])
          setPlaylist([...musics.map(music => music.track.uri)])
          setApiUrl(resp?.next)
          setLen(resp.total)
          //console.log(resp)

        }
      })
      .catch(err => console.log(err))
      
    }, [token, apiUrl])

    useEffect(()=>{
      setSelected(playlist)
    }, [apiUrl])

    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  
    function formatDate(undate){
      const date = new Date(undate)
      const today = new Date()
      const timeDiff = Math.abs(today.getTime() - date.getTime());

      const diferenca = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      const semanas = Math.floor(diferenca/7)
      const minutos = Math.ceil(timeDiff / (1000 * 60));
      const horas = Math.floor(minutos/60)

      //minutos
      if(horas <= 0){
        return minutos > 1 ? `Há ${minutos} minutos` : `Há ${minutos} minuto`
      }
      //horas
      if(horas > 0 && horas < 24){
        return horas > 1 ? `Há ${horas} horas` : `Há ${horas} hora`
      }
      //dias
      if(diferenca < 7){
        return diferenca > 1 ? `Há ${diferenca} dias` : `Há ${diferenca} dia`
      }
      //semanas
      if( semanas < 4){
        return semanas > 1 ? `Há ${semanas} semanas` :  `Há ${semanas} semana`
      }

      //meses
      const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out" ,"nov", "dez"]
  
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
  
      return `${day} de ${months[month]} de ${year}`
    }
    
    return(
      <div className="App">
        <div className="collection_header">
         <Header currentList={currentList} listCount={listLen} authLink={authLink}/>
        </div>
        <div className="musics">
            <div className="musics_container">
              {musics?.map((musica, i) =>{
              return(
                <div 
                key={i}
                className="track" 
                onMouseEnter={() => {
                  hover.current == musica.track.uri && play ? setHover({i: i, hover: 'pause', current: currentTrack }) : 
                  setHover({i: i, hover: <BsFillPlayFill onClick={() => {setPlay(true)}}/>, current:  currentTrack})}}
                onMouseLeave={() => {setHover({i: null, hover: null})}}
                >
                  <div className='play_button header_button'>
                    <button onClick={() => {
                      setSelected([musica.track.uri, ...playlist.filter(musc => musc != musica.track.uri)])
                    }} key={i} id={i} >
                      { 
                      hover.hover === 'pause' && hover.i === i  ? <BiPause onClick={() => setPlay(!play)}/> :
                       currentTrack == musica.track.uri && play ? <BsSoundwave color="green" /> : 
                       currentTrack == musica.track.uri && !play ? hover.i === i ? hover.hover : <p style={{color: 'green'}}> { i + 1} </p> :
                       hover.i === i ? hover.hover : i + 1  
                       }
                    </button>
                  </div>
                  <div className='header_title'>
                    <div className="music_infos">
                      <div className="img">
                        <img src={musica.track.album.images[2].url} alt={musica.track.name}/>
                      </div>
                      <div className="music_title_artits">
                        <a target="_blank" rel="noreferrer" href={musica.track.external_urls.spotify} className={`music_name ${musica.track.uri == currentTrack ? 'paused' : ''}`}>{musica.track.name}</a>
                        <span className="artist_name">
                        {musica.track.artists.map((artista, i)=>{
                          return i != musica.track.artists.length  - 1 ? <p key={i}><a target="_blank" rel="noreferrer" href={artista.external_urls.spotify}>{artista.name}</a>, </p> : <a key={i} target="_blank" rel="noreferrer" href={artista.external_urls.spotify}>{artista.name}</a>
                        })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='header_album'>
                    <span className="album_name"><a target="_blank" rel="noreferrer" href={musica.track.album.external_urls.spotify}>{musica.track.album.name}</a></span>
                  </div>
                  <div className='header_added'>
                    {formatDate(musica.added_at)}<br />
                  </div>
                  <div className='header_time'>
                    <AiFillHeart color="#1ed760" />
                    {millisToMinutesAndSeconds(musica.track.duration_ms)}
                  </div>
                </div>
              )
              })}
            </div>
        </div>
      </div>
    )
  }

export default Collection