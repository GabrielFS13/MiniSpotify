import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function AlbumComponent({infos}){
    return(
        infos.map((album, i) => {
            return (
                <Link
                    to={`/${album.album.id}`} key={i}>
                    <div className="card">
                        <div className="card_img">
                            <img src={album.album.images[0]?.url} alt={album.name} />
                        </div>
                        <div className="card_infos">
                            <div className="card_playlist_title">
                                {album.album.name}
                            </div>
                            <div className="card_playlist_owner">
                               {album.album.artists[0].name}
                            </div>
                            <div className="card_btn">
                                <BsFillPlayFill size={30} color="black" />
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    )
}