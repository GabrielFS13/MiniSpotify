import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import getCurrentUser from "../Helpers/getCurrentUser";

export default function HeaderNav({token, buttons = [], search = false}) {
    const [currentUser, setCurrentUser] = useState()
    const currentPage = useLocation().pathname;
    useEffect(()=>{
        if(token){
            getCurrentUser(token).then(resp => setCurrentUser(resp))
        }
    }, [token])
    return (
        currentUser && <nav className='header_nav'>
            <div className="navButtons">
                <ul className='nav_links'>
                    <li><Link to={''}><SlArrowLeft /></Link></li>
                    <li><Link to={''}><SlArrowRight /></Link></li>
                    {buttons.map((btn, i) =>{
                        return <Link 
                                    key={i} 
                                    className={`header_nav_btn ${currentPage == "/library/"+btn ? 'actived' : ''}`}
                                    to={`/library/${btn}`}
                                    >{btn}</Link>
                    })}
                    {search && <input tyoe="search" placeholder="O que você quer ouvir?"/>}
                </ul>
            </div>
            <div className="user_infos">
                <div className="userModal">
                    <div className="user_img">
                        <img src={currentUser.images[0].url} alt={currentUser.display_name} />
                    </div>
                    {currentUser.display_name}
                    <AiFillCaretDown />
                </div>
            </div>
        </nav>
    )
}