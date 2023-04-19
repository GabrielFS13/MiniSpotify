import { BsFillPlayFill } from 'react-icons/bs'
import { BiPause } from 'react-icons/bi'


export default function LikedMusicButton({setPlay, setSelected, collectionType, play, musics, currentList}) {
    return (
        <div className='header_button'>
            {!play && <BsFillPlayFill size={30} color="black" onClick={() => {
                setPlay(true)
                setSelected({
                    playlist: collectionType ? collectionType : '',
                    list_musics: [...musics.map(music => music.track.uri)]
                })
            }} />
            }
            {play && !currentList && <BiPause size={30} color='black' onClick={() => setPlay(false)} />}
            {currentList && play && <BsFillPlayFill size={30} color="black" onClick={() => {
                setPlay(true)
                setSelected({
                    playlist: collectionType ? collectionType : '',
                    list_musics: [...musics.map(music => music.track.uri)]
                })
            }} />}
        </div>
    )
}