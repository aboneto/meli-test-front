import React from 'react';
import PropTypes from "prop-types";
import BreadcrumbItem from "./BreadcrumbItem";
import style from './style.scss';

const Breadcrumb = (props) => {
    const { categories } = props;

    return <ul className='breadcrumb'>
        {categories.map(item => <BreadcrumbItem category={item} key={item } />)}
    </ul>;
};

Breadcrumb.propTypes = {
    categories: PropTypes.array
};

export default Breadcrumb;
