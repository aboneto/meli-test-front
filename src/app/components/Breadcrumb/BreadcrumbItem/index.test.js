import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import BreadcrumbItem from './index';

const category = "Notebooks";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><BreadcrumbItem category={category} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
