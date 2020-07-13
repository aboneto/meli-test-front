import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import ListProducts from "components/Search/ListProducts";
import CatalogService from "services/CatalogService";
import Loader from "components/Loader";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";

const Search = (props) => {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, seLoading] = useState(false);

    useEffect(() => {
        const {search} = props.location;
        const query = queryString.parse(search);

        seLoading(true);
        setSearch(query.search);

        CatalogService.search(query.search).then(data => {
            setCategories(data.categories);
            setProducts(data.items);
            seLoading(false);
        });
    }, [props]);

    return <main className='page search-page'>
        <Helmet>
            <title>{(search ? `${search} en ` : '') + 'Mercado Libre Chile'}</title>
        </Helmet>
        <div className='container'>
            {loading && <Loader/>}
            {!loading && categories && <Breadcrumb categories={categories}/>}
            {!loading && products && <ListProducts products={products}/>}
        </div>
    </main>
};

Search.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};

export default Search;
