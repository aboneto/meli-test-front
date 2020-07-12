import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Product from './index';

const match = {
    "path": "/items/:id",
    "url": "/items/MLA825587109",
    "isExact": true,
    "params": {
        "id": "MLA825587109"
    }
};

const location = {
    "pathname": "/items/MLA825587109",
    "search": "",
    "hash": "",
    "key": "v0u756"
};

const history = {
    "length": 50,
    "action": "PUSH",
    "location": {
        "pathname": "/items/MLA825587109",
        "search": "",
        "hash": "",
        "key": "v0u756"
    },
    "createHref": {},
    "push": {},
    "replace": {},
    "go": {},
    "goBack": {},
    "goForward": {},
    "block": {},
    "listen": {}
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Product history={history} match={match} location={location} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
