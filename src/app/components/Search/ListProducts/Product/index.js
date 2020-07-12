import React from 'react';
import {Link} from "react-router-dom";
import CurrencyService from "services/CurrencyService";
import PropTypes from "prop-types";
import style from './style.scss';

const Product = (props) => {
    const {product} = props;
    const url = `/items/${product.id}`;

    const price = CurrencyService.get(product.price);

    return <article className='product-item'>
        <Link to={url} className='product-item-image'>
            <img src={product.picture} alt={product.title} />
        </Link>
        <div className='product-item-info'>
            <Link to={url}>
                <h1 className='product-item-titulo'>{product.title}</h1>
            </Link>
            <span className='product-item-price'>$ {price}</span>
            {product.free_shipping && <span className='product-item-free-shipping'>Envío gratis</span>}
        </div>
    </article>
};

Product.propTypes = {
    product: PropTypes.object
};

export default Product;
