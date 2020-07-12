import React from 'react';
import htmlParse from 'html-react-parser';
import CurrencyService from "services/CurrencyService";
import PropTypes from "prop-types";
import style from './style.scss';

const ProductDetail = (props) => {
    const {product} = props;

    const isNew = product.condition === 'new';
    const soldQuantity = product.sold_quantity;
    const description = htmlParse(product.description);
    const price = CurrencyService.get(product.price);

    return <div className='container product-page-container'>
        <div className='product-info'>
            <div className='product-image'>
                <img src={product.picture} alt={product.title}/>
            </div>
            <div className='product-info-content'>
                <span className='product-status'>{(isNew && 'Nuevo')} {soldQuantity ? `- ${soldQuantity} vendido${soldQuantity > 1 ? 's' : ''}` : ''}</span>
                <h1 className='product-title'>{product.title}</h1>
                <span className='product-price'>
                    $ {price}
                    {product.price.decimals > 0 && <span className='product-price-decimal'>{product.price.decimals}</span>}
                </span>
                <button className='primary-btn product-buy-btn'>Comprar</button>
            </div>
        </div>
        {product.description && <div className='product-description'>
            <h3 className='product-description-title'>Descripción del Producto</h3>
            <div className='product-description-content'>
                {description}
            </div>
        </div>}
    </div>
};

ProductDetail.propTypes = {
    product: PropTypes.object
};

export default ProductDetail;
