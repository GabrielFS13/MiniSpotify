import './Menu.css'

export default function Menu({playlists}){

    console.log(playlists)


    return(
        <nav className='nav_bar'>
            <div className="logo">
                Spotify
            </div>
            <div className="static_menu">
                <ul>
                    <li>Início</li>
                    <li>Buscar</li>
                    <li className='active'>Sua Biblioteca</li>
                </ul>
            </div>
            <div className="createFav">
                <ul>
                    <li>Criar Playlist</li>
                    <li>Músicas Curtidas</li>
                </ul>
            </div>
            <div className="user_playlists">
                <ul>
                    {playlists.map(playlist => { return <li> {playlist.name} </li> })}
                </ul>   
            </div>
        </nav>
    )
}