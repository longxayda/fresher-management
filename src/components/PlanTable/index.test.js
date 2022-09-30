import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from 'react-test-renderer';
import {shallow , mount, render } from "enzyme";

import PlanTable from "./index";

Enzyme.configure({ adapter: new Adapter()});

describe("Test PlanTable input props", () => {
    test("plan table with empty columns & data", () => {
        const columns = [];
        const data = [];
        const tree = shallow(<PlanTable columns={columns} data={data}/>);
        expect(tree.find('.plan-details-header').exists()).toEqual(false);
    })

    test("plan table with NULL columns & data", () => {
        const columns = null;
        const data = null;
        const tree = shallow(<PlanTable columns={columns} data={data}/>);
        expect(tree.find('.plan-details-header').exists()).toEqual(false);
    })

    test('plan table with valid column & empty data',()=>{
        const columns = [{Header: 'Test'}];
        const data = [];
        const tree = shallow(<PlanTable columns={columns} data={data}/>);
        expect(tree.find('.plan-details-header').exists()).toEqual(true);
        expect(tree.find('.plan-details-data').exists()).toEqual(false);
    })

    test('plan table with empty column & valid data',()=>{
        const columns = [];
        const data = [{test:1}];
        const tree = shallow(<PlanTable columns={columns} data={data}/>);
        expect(tree.find('.plan-details-header').exists()).toEqual(false);
        expect(tree.find('.plan-details-data').exists()).toEqual(false);
    })

    test('plan table with valid column & valid data',()=>{
        const columns = [{Header: 'Test', accessor:'test'}];
        const data = [{test: 1}];
        const tree = shallow(<PlanTable columns={columns} data={data}/>);
        expect(tree.find('.plan-details-header').exists()).toEqual(true);
        expect(tree.find('.plan-details-data').exists()).toEqual(true);
    })
})

describe("Test PlanTable render" , () => {
    test('render plan table with cell function',()=>{
        const columns = [{Header: 'Test-cell', Cell: ({row})=><button className="test-cell-function">test cell</button>,}];
        const data = [{}];
        const tree = renderer.create(<PlanTable columns={columns} data={data}/>).root;
        expect(tree.findByProps({className: "test-cell-function"}).children).toEqual(['test cell']);
    })

    test('render plan table with cell function 2',()=>{
        const columns = [{Header: 'Test-cell', Cell: ({row})=><button className="test-cell-function">{row.original.test}</button>,}];
        const data = [{test: 'test cell 2'}];
        const tree = renderer.create(<PlanTable columns={columns} data={data}/>).root;
        expect(tree.findByProps({className: "test-cell-function"}).children).toEqual(['test cell 2']);
    })
});

test("Test PlanTable snapshot", () => {
    const columns = [{Header: 'Test',accessor: 'test'}];
    const data = [{test: 'test 1'},{test:'test 2'}]
    const component = renderer.create(
        <PlanTable columns={columns} data={data}/>,
      );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
