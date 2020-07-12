import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Loader = (props) => {
    return (
        <i className={"loader active " + (props.className || '' )} />
    )
};

Loader.propTypes = {
    className: PropTypes.string
};

export default Loader;
