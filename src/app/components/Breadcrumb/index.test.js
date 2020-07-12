import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Breadcrumb from './index';

const categories = ["Computación","Laptops y Accesorios","Notebooks"];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Breadcrumb categories={categories} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
