import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import { EvaluationTable } from 'components/Audit/Evaluation/EvaluationTable';

describe('Test Table', () => {
    test('renders Table with EMPTY props', () => {
        const column = [], data = [];
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    });

    test('renders Table with NULL props', () => {
        const column = null, data = null;
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    });

    test('renders Table with INVALID VALUE with number props', () => {
        const column = ['a', 2], data = [3, 5];
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    });

    test('renders Table with INVALID VALUE with object props', () => {
        const column = [{abv: 'asdas', as: 'afaa'}], data = [[{abv: 'asdas', as: 'afaa'}]];
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    });

    test('renders Table with INVALID TYPE props', () => {
        const column = 1, data = 1;
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(false);
    });

    test('renders Table with VALID VALUE props', () => {
        const column = [{Header: 'Name', accessor: 'name'}], data = [{name: 'asdas'}];
        const tree = shallow(<EvaluationTable columns={column} data={data}/>);
        expect(tree.find('.evaluation-table').exists()).toEqual(true);
    });
});