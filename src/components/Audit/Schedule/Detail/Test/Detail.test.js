import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';
import { Link,MemoryRouter as Router } from 'react-router-dom';
import TableDetail from "components/Audit/Schedule/Detail/TableDetail";
import Detail from "components/Audit/Schedule/Detail/Detail.js";
import ModalDetailEvaluate from "components/Audit/Schedule/Detail/Modal/ModalDetailEvaluate";
Enzyme.configure({ adapter: new Adapter() });
describe("test detail", ()=>{
    test('render detail',()=>{    
        const tree = shallow(<Detail/>)
        expect(tree.find('.detail').exists()).toEqual(true)
    });
})

describe("test evaluate table", ()=>{
    test('includes link to Mission scene', () => { 
        const wrapper = mount(<Router><TableDetail/></Router>);
        expect(wrapper.find(Link)).toBeTruthy();
        expect(wrapper.find('Link').exists()).toEqual(false); 
    })   
    test('includes link to Mission scene', () => { 
        const isOpen=jest.fn(),
        hideModal=jest.fn(),
        dataModal=jest.fn(),
        id=jest.fn(),
        tree = shallow(<ModalDetailEvaluate
        isOpen={isOpen} hideModal={hideModal} dataModal={dataModal}
        />)
        expect(tree.find('.modal-evaluate').exists()).toEqual(true)
    })
})   
