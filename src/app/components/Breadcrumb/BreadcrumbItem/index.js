import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import useMobile from "hooks/useMobile";
import style from './style.scss';

const BreadcrumbItem = (props) => {
    const { category } = props;
    const isMobile = useMobile();

    if(isMobile) return '';

    return <li className='breadcrumb-item'>
        <Link to={'/'} className='breadcrumb-link'>{category}</Link>
    </li>;
};

BreadcrumbItem.propTypes = {
    category: PropTypes.string
};

export default BreadcrumbItem;
