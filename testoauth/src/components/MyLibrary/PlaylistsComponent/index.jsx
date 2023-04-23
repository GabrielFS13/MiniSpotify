import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function PlaylistsComponent({infos}){
    return(
        infos.map((playlist, i) => {
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
        })
    )
}