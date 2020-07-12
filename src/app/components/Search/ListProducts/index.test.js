import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import ListProducts from './index';

const products = [{"id":"MLA825587109","title":"Macbook Pro 16 Pulgadas 1 Tb Ssd Core I9 16 Gb Ram Apple ","price":{"currency":"ARS","amount":598950,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/789278-MLA32893587192_112019-I.jpg","condition":"new","free_shipping":true},{"id":"MLA847743217","title":"Nueva Macbook Pro 2020 16 Touchbar I7 9na 6cores Ssd512 16gb","price":{"currency":"ARS","amount":599999,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/844569-MLA41359852548_042020-I.jpg","condition":"new","free_shipping":true},{"id":"MLA864035867","title":"Macbook Pro 16 Español 2020 I9 9880h 16gb 1tb Amd 5500m 4gb","price":{"currency":"ARS","amount":601368,"decimals":80},"picture":"http://mla-s2-p.mlstatic.com/802287-MLA42248594780_062020-I.jpg","condition":"new","free_shipping":true},{"id":"MLA853253994","title":"Macbook Pro 15-5r962ll/a-2.2ghz-6c-i7-leer Descripcion!","price":{"currency":"ARS","amount":316679,"decimals":0},"picture":"http://mla-s1-p.mlstatic.com/921623-MLA41638692995_052020-I.jpg","condition":"new","free_shipping":true}];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><ListProducts products={products} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
