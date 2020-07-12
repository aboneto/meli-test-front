import React from 'react';
import Search from "components/Header/Search";
import {Link} from "react-router-dom";
import useMobile from "hooks/useMobile";
import styles from './style.scss';

const Header = () => {
    const isMobile = useMobile();

    return <header className='header'>
        <div className='container'>
            <Link to='/' className='header-logo'>
                {isMobile && <img src='https://http2.mlstatic.com/frontend-assets/ui-navigation/5.6.0/mercadolibre/logo__small@2x.png' />}
                {!isMobile && <img src='https://http2.mlstatic.com/frontend-assets/ui-navigation/5.7.0/mercadolibre/logo__large_plus.png' />}
            </Link>
            <Search/>
        </div>
    </header>
};

export default Header;
