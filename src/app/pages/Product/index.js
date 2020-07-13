import React, {useEffect, useState}  from 'react';
import { Helmet } from 'react-helmet';
import ProductDetail from "components/ProductDetail";
import CatalogService from "services/CatalogService";
import Loader from "components/Loader";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";

const Product = (props) => {
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const {params} = props.match;

        CatalogService.getDetail(params.id).then(data => {
            if(data) setCategories(data.categories);
            setProduct(data);
        });
    }, [props]);

    return <main className='page product-page'>
        <Helmet>
            <title>{(product ? `${product.title} en ` : '') + 'Mercado Libre Chile'}</title>
        </Helmet>
        {!product && <Loader />}
        {categories && <Breadcrumb categories={categories}/>}
        {product && <ProductDetail product={product} />}
    </main>
};

Product.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object
};

export default Product;
