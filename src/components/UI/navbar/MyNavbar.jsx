import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const MyNavbar = () => {
    const {setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>Выйти</MyButton>
            <div className="navbar__links">
                <Link to='/posts'>Посты</Link>
                <Link to='/about'>О сайте</Link>
            </div>
        </div>
    );
};

export default MyNavbar;
