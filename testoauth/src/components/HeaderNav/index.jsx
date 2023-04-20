import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import getCurrentUser from "../Helpers/getCurrentUser";

export default function HeaderNav({token, buttons = []}) {
    const [currentUser, setCurrentUser] = useState()

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