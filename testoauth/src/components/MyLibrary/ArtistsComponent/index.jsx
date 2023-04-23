import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function ArtistsComponent({infos}){
    return(
        infos.map((artist, i) => {
            return (
                <Link
                    to={`/${artist.id}`} key={i}>
                    <div className="card">
                        <div className="card_img radius">
                            <img src={artist.images[0]?.url} alt={artist.name} />
                        </div>
                        <div className="card_infos">
                            <div className="card_playlist_title">
                                {artist.name}
                            </div>
                            <div className="card_playlist_owner">
                                Artista
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