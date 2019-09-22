import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter()});

describe('<NavigationItems />', () => {    
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); 
    });

    it('Should render two NavigationItem if not authenticated.', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render three NavigationItem if authenticated.', () => {
        // const wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Should render the logout NavigationItem if authenticated.', () => {
        // const wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
}); 