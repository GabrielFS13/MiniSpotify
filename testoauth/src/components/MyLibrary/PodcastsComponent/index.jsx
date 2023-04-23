import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function PodcastComponent({infos}){
    return(
        infos.map((podcast, i) => {
            return (
                <Link
                    to={`/${podcast.show.id}`} key={i}>
                    <div className="card">
                        <div className="card_img">
                            <img src={podcast.show.images[0]?.url} alt={podcast.name} />
                        </div>
                        <div className="card_infos">
                            <div className="card_playlist_title">
                                {podcast.show.name}
                            </div>
                            <div className="card_playlist_owner">
                                {podcast.show.description ? podcast.show.description : "De " + podcast.shiw.name}
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