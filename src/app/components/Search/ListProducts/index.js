import React from 'react';
import Product from "./Product";
import PropTypes from "prop-types";
import style from './style.scss';

const ListProducts = (props) => {
    const {products} = props;

    return <section className='product-list'>
        {products.map(product => <Product product={product} key={product.id} />)}
    </section>
};

ListProducts.propTypes = {
    products: PropTypes.array
};

export default ListProducts;
