import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');
global.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

global.google = {
    maps: {
        places: {
            Autocomplete: class {}
        },
        Animation: {
            DROP: 'drop'
        },
        Point: class {}
    }
};

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
