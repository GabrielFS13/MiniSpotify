import { BsFillPlayFill } from 'react-icons/bs'
import { BiPause } from 'react-icons/bi'

export default function PlaylistButton({ play, currentList, collectionType, musics, setPlay, setSelected }) {
  return (
    <div className='header_button'>
      {!play && currentList ? <BsFillPlayFill size={30} color="black" onClick={() => {
        setPlay(true)
        setSelected({
          playlist: collectionType ? collectionType : '',
          list_musics: [...musics.map(music => music.track.uri)]
        })
      }} />
        : currentList == collectionType ? <BiPause size={30} color='black' onClick={() => setPlay(false)} /> :
          <BsFillPlayFill size={30} color="black" onClick={() => {
            setPlay(true)
            setSelected({
              playlist: collectionType ? collectionType : '',
              list_musics: [...musics.map(music => music.track.uri)]
            })
          }} />
      }
    </div>
  )
}