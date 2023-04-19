import { useEffect, useState } from "react";
import { BsFillPlayFill, BsSoundwave } from 'react-icons/bs'
import { BiPause } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { HiOutlineClock } from 'react-icons/hi'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import './Collection.css'
import { useParams } from "react-router-dom";
import Header from "../Header";
import PlaylistButton from "../PlaylistButton";
import LikedMusicButton from "../LikedMusicsButton";
import { useInView, InView } from 'react-intersection-observer';

function Collection({ token, setPlay, setSelected, currentTrack, play, authLink, currentList }) {

  const [apiUrl, setApiUrl] = useState("https://api.spotify.com/v1/me/tracks")
  const { collectionType } = useParams()
  const [listLen, setLen] = useState(0)
  const [hover, setHover] = useState({ i: null, hover: null })
  const [color, setColor] = useState({ backgroundColor: `rgb(${0},${0},${0})` })
  const [musics, setMusics] = useState([])
  const { ref, inView, entry } = useInView();


  useEffect(() => {
    if (collectionType) {
      //pega o id da playlist
      //chama aq `https://api.spotify.com/v1/playlists/${playlist_id}`
      setApiUrl(`https://api.spotify.com/v1/playlists/${collectionType}`)
    } else {
      setApiUrl("https://api.spotify.com/v1/me/tracks")
    }
    setMusics([])
    setLen(0)
  }, [collectionType])

  function getMusics() {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.type === 'playlist') {
          setMusics([...musics, ...resp.tracks.items])
          setApiUrl(resp?.next)
          setLen(resp.tracks.total)
          //console.log(resp)
        } else {
          setMusics([...musics, ...resp?.items])
          setApiUrl(resp?.next)
          setLen(resp.total)
          //console.log(resp)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getMusics()
  }, [token])

  useEffect(()=>{
    if(inView){
      getMusics()
    }
  }, [inView, collectionType])


  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function formatDate(undate) {
    const date = new Date(undate)
    const today = new Date()
    const timeDiff = Math.abs(today.getTime() - date.getTime());

    const diferenca = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const semanas = Math.floor(diferenca / 7)
    const minutos = Math.ceil(timeDiff / (1000 * 60));
    const horas = Math.floor(minutos / 60)

    //minutos
    if (horas <= 0) {
      return minutos > 1 ? `Há ${minutos} minutos` : `Há ${minutos} minuto`
    }
    //horas
    if (horas > 0 && horas < 24) {
      return horas > 1 ? `Há ${horas} horas` : `Há ${horas} hora`
    }
    //dias
    if (diferenca < 7) {
      return diferenca > 1 ? `Há ${diferenca} dias` : `Há ${diferenca} dia`
    }
    //semanas
    if (semanas < 4) {
      return semanas > 1 ? `Há ${semanas} semanas` : `Há ${semanas} semana`
    }

    //meses
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${day} de ${months[month]} de ${year}`
  }


  return (
    <div className="App" style={color}>
      <div className="collection_header">
        <Header currentList={collectionType} listCount={listLen} authLink={authLink} setColor={(e) => setColor(e)} token={token} />
      </div>
      <div className="musics" >
        <div className="play_btn">
          {collectionType &&
            <PlaylistButton
              play={play}
              currentList={currentList}
              collectionType={collectionType}
              musics={musics}
              setPlay={(e) => setPlay(e)}
              setSelected={(e) => setSelected(e)}
            />
          }
          {!collectionType &&
            <LikedMusicButton
              play={play}
              currentList={currentList}
              collectionType={collectionType}
              musics={musics}
              setPlay={(e) => setPlay(e)}
              setSelected={(e) => setSelected(e)}
            />
          }
          {collectionType && <AiFillHeart color="#1ed760" size={30} />}
          <div className="ellipisMenu">
            <IoEllipsisHorizontalSharp size={20} color="#a7a7a7" />
          </div>
        </div>
        <div className="musics_header">
          <div className="header_button">
            #
          </div>
          <div className="header_title">
            Título
          </div>
          <div className="header_album">
            Álbum
          </div>
          <div className="header_added">
            Adicionada em
          </div>
          <div className="header_time clock">
            <HiOutlineClock size={20} />
          </div>
        </div>
        <div className="musics_container">
          {musics?.map((musica, i) => {
            return (
              <div
                key={i}
                className="track"
                onMouseEnter={() => {
                  hover.current == musica.track.uri && play ? setHover({ i: i, hover: 'pause', current: currentTrack }) :
                    setHover({ i: i, hover: <BsFillPlayFill onClick={() => { setPlay(true) }} />, current: currentTrack })
                }}
                onMouseLeave={() => { setHover({ i: null, hover: null }) }}
              >
                <div className='play_button header_button'>
                  <button onClick={() => {
                    setSelected({
                      playlist: collectionType ? collectionType : '',
                      list_musics: [musica.track.uri, ...musics.filter(musc => musc.track.uri != musica.track.uri).map(m => m.track.uri)]
                    })
                  }} key={i} id={i} >
                    {
                      hover.hover === 'pause' && hover.i === i ? <BiPause onClick={() => setPlay(!play)} /> :
                        currentTrack == musica.track.uri && play ? <BsSoundwave color="green" /> :
                          currentTrack == musica.track.uri && !play ? hover.i === i ? hover.hover : <p style={{ color: 'green' }}> {i + 1} </p> :
                            hover.i === i ? hover.hover : i + 1
                    }
                  </button>
                </div>
                <div className='header_title'>
                  <div className="music_infos">
                    <div className="img">
                      <img src={musica.track.album.images[2].url} alt={musica.track.name} />
                    </div>
                    <div className="music_title_artits">
                      <a target="_blank" rel="noreferrer" href={musica.track.external_urls.spotify} className={`music_name ${musica.track.uri == currentTrack ? 'paused' : ''}`}>{musica.track.name}</a>
                      <span className="artist_name">
                        {musica.track.artists.map((artista, i) => {
                          return i != musica.track.artists.length - 1 ? <p key={i}><a target="_blank" rel="noreferrer" href={artista.external_urls.spotify}>{artista.name}</a>, </p> : <a key={i} target="_blank" rel="noreferrer" href={artista.external_urls.spotify}>{artista.name}</a>
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
              {musics.length < listLen - 1 || musics.length === 0 ? <p className="loading"><img src="./loading.gif" alt="Carregando mais músicas..." /></p> : ''}
              <div ref={ref} className="footer" id="footer"></div>
        </div>
      </div>
    </div>
  )
}

export default Collection