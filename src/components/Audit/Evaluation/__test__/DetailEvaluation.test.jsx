import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';

import { WrapTable } from '../DetailEvaluation';
import DetailEvaluation from '../DetailEvaluation';

Enzyme.configure({ adapter: new Adapter() });

describe('Test WrapTable', () => {
    test('renders WrapTable of DetailEvaluation with EMPTY props', () => { 
        const column = [], data = [];
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(false);
    });

    test('renders WrapTable of DetailEvaluation with NULL props', () => {
        const column = null, data = null;
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(false);
    });

    test('renders WrapTable of DetailEvaluation with INVALID VALUE 1 props', () => {
        const column = [1, 2], data = [3, 5];
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(false);
    });

    test('renders WrapTable of DetailEvaluation with INVALID VALUE 2 props', () => {
        const column = [{abv: 'asdas', as: 'afaa'}], data = [[{abv: 'asdas', as: 'afaa'}]];
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(false);
    });

    test('renders WrapTable of DetailEvaluation with INVALID TYPE props', () => {
        const column = 1, data = 1;
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(false);
    });

    test('renders WrapTable of DetailEvaluation with VALID VALUE props', () => {
        const column = [{Header: 'Name', accessor: 'name'}], data = [[{name: 'asdas'}]];
        const tree = shallow(<WrapTable columns={column} data={data} />);
        expect(tree.find('.wraptable-detail').exists()).toEqual(true);
    });
});

describe('Test DetailEvaluation', () => {
    test('check DetailEvaluation\'s component is EXIST', () => {
        const tree = mount(<DetailEvaluation />);
        expect(tree.find('.detail-evaluation').exists()).toEqual(true);
    });

    test('render DetailEvaluation\'s component correctly', () => {
        const tree = shallow(<DetailEvaluation />);
        expect(tree.getElements()).toMatchSnapshot();
    });
});