import { useState } from 'react'
import HeaderNav from '../HeaderNav'
import './Search.css'
import { useEffect } from 'react'
import getSpotifyData from '../Helpers/getSpotifyData'


export default function Search({token}){

    const [categoriasApi, setCategoriasApi] = useState("https://api.spotify.com/v1/browse/categories")
    const [catoregoriasData, setCategoriasData] = useState([])

    useEffect(()=>{
        getSpotifyData(token, categoriasApi).then(resp =>{
            console.log(resp)
            setCategoriasData(resp.categories.items)
            setCategoriasApi(resp?.next)
        })
    }, [token, categoriasApi])

    return (
        <div className="App">
            <header className='search_header'>
                <HeaderNav token={token} search={true} />
            </header>
            <main className='categories_page'>
                <div className="history">

                </div>
                <div className="categories">
                    {catoregoriasData.map((categoria, i) =>{
                        return(
                            <div className='categories_card' key={i}>
                                <span className="categorie_name">
                                    {categoria.name}
                                </span>
                                <div className="categorie_img">
                                    <img src={categoria.icons[0].url} alt={categoria.name} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            <div className="footer">

            </div>
        </div>
    )
}