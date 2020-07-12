const getDetail = (id) => {
    return fetch(`http://localhost:3000/api/items/${id}`)
        .then(data => data.json())
        .then(data => {
            if(!(data && data.item)) return null;
            return data.item;
        });
};

const search = (text) => {
    return fetch(`http://localhost:3000/api/items?q=${text}`)
        .then(data => data.json())
        .then(data => {
            if(!(data && data.items)) return null;
            return data;
        });
};

const CatalogService = {
    getDetail,
    search
};

export default CatalogService;
