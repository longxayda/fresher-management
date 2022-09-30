import React from 'react';
import Enzyme, {render, shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NewAuditModal from 'components/CreateNewAudit/NewAuditModal.js'
import {Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

Enzyme.configure({adapter: new Adapter()});

describe('Test for bootstrap component render', () => {
    it('should render Container', () => {
        const wrapper = shallow(<NewAuditModal />);
        const container = wrapper.find(Container);

        expect(container.exists()).toBe(true);
    })

    it('should render Row', () => {
        const wrapper = shallow(<NewAuditModal />);
        const row = wrapper.find(Row);

        expect(row.exists()).toBe(true);
    })
    
    it('should render Col', () => {
        const wrapper = shallow(<NewAuditModal />);
        const col = wrapper.find(Col);

        expect(col.exists()).toBe(true);
    })

    it('should render Card', () => {
        const wrapper = shallow(<NewAuditModal />);
        const card = wrapper.find(Card);

        expect(card.exists()).toBe(true);
    })

    it('should render Form', () => {
        const wrapper = shallow(<NewAuditModal />);
        const form = wrapper.find(Form);

        expect(form.exists()).toBe(true);
    })

})

describe('test function', () => {
    it('should call handleClear when clicked', () => {
        const handleClear = jest.fn();

        const button = shallow(<Button id="clear-btn" onClick={handleClear}>Ok!</Button>);
        button.find('#clear-btn').simulate('click');
        expect(handleClear.mock.calls.length).toEqual(1);
    });
})