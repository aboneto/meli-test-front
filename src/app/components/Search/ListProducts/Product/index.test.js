import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Product from './index';

const product = {"id":"MLA825587109","title":"Macbook Pro 16 Pulgadas 1 Tb Ssd Core I9 16 Gb Ram Apple ","price":{"currency":"ARS","amount":598950,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/789278-MLA32893587192_112019-I.jpg","condition":"new","free_shipping":true};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Product product={product} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
