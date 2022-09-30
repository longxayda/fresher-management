import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

import Evaluations from 'components/Audit/Evaluation/Evaluations';

const app = <Provider store={store}><Evaluations /></Provider>

describe('Test Evaluations', () => {
    test.only('Renders TraineesEvaluation successfully', () => {
        const tree = mount(app);
        expect(tree.find('#main-page-evaluation').exists()).toEqual(true);
    })

    test.only('Renders content of TraineesEvaluation successfully', () => {
        const tree = mount(app);
        expect(tree.find('#trainees-evaluation').exists()).toEqual(true);
    })
})

