import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { shallow, mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

import TraineesEvaluation from 'components/Audit/Evaluation/TraineesEvaluation';

describe('Test TraineesEvaluation', () => {
    test('check TraineesEvaluation\'s component is EXIST', () => {
        const tree = mount(<Provider store={store}><TraineesEvaluation /></Provider>);
        expect(tree.find('.trainees-evaluation').exists()).toEqual(true);
    });
});

describe('Test States on TraineesEvaluation', () => {

    let tree;
    beforeEach(() => {
        tree = mount(<Provider store={store}><TraineesEvaluation /></Provider>);
    })

    test('check Select Button Session is DISABLED', () => {
        expect(tree.find('#session-select').prop('disabled')).toEqual(true);
    })

    test.only('check Select Button Session is NOT DISABLED', () => {
        tree.find('#class-select').simulate('change', {target: {value: 'HCM22_CPL.O_JAVA_01'}})
        expect(tree.find('#session-select').prop('disabled')).toEqual(false);
    })

    test('check Evaluation Table is not EXIST before select class and session', () => {
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    })

    test.only('check Evaluation Table is EXIST after select class and session', () => {
        tree.find('#session-select').simulate('change', {target: {value: '2'}})
        // const exp = jest.fn(() => expect(tree.find('.evaluation-table').exists()).toEqual(true));
        tree.update();
        expect(tree.find('.evaluation-table').exists()).toEqual(true)
    })
    
    test('check Button in Action is not EXIST before select class and session', () => {
        expect(tree.find('.show-Modal').exists()).toEqual(false);
    })

    test('check Button in Action is EXIST after select class and session', () => {
        tree.find('#session-select').simulate('change', {target: {value: 'React'}})
        expect(tree.find('.show-Modal').exists()).toEqual(true);
    })

    test('check Modal is not EXIST before click action', () => {
        expect(tree.find('.modal-primary').exists()).toEqual(true);
        expect(tree.find('.modal-primary').props().show).toEqual(false);
    })

    test('check Data in Modal body is not EXIST before click action', () => {
        expect(tree.find('#detail-component').exists()).toEqual(false);
    })

    test('check Modal is SHOW after click action', () => {
        tree.find('.button-showModal').first().simulate('click');
        expect(tree.find('.modal-primary').at(0).props().show).toEqual(true);
    })

    test('check Modal body is EXIST after click action', () => {
        tree.find('.button-showModal').first().simulate('click');
        expect(tree.find('#detail-component').exists()).toEqual(true);
    })

    test('check Modal is not SHOW after click Close modal', () => {
        tree.find('.button-showModal').first().simulate('click');
        tree.find('.button-closeModal').first().simulate('click');
        expect(tree.find('.modal-primary').at(0).props().show).toEqual(false);
    })
});