import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Search from './index';

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
    ReactDOM.render(<Router><Search history={history} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
