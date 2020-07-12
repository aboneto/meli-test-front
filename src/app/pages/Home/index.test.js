import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Home from './index';

const match = {
    "path": "/",
    "url": "/",
    "isExact": true,
    "params": {}
};

const location = {
    "pathname": "/",
    "search": "",
    "hash": "",
    "key": "v0u756"
};

const history = {
    "length": 50,
    "action": "PUSH",
    "location": {
        "pathname": "/",
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
    ReactDOM.render(<Router><Home history={history} match={match} location={location} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
