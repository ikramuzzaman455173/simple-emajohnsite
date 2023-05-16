import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);
            }).catch(error => {
                console.log(`Error:`, error.message);
            })
    }
    return (
        <nav className='header'>
            <Link to="/"><img src={logo} alt="" /></Link>
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                {user && <span className='text-white'>Welcome {user.email} <button className='logOut-btn' onClick={handleLogOut}>Log Out</button></span>}
            </div>
        </nav>
    );
};

export default Header;
