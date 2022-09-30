import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from 'react-test-renderer';
import {shallow , mount, render } from "enzyme";

import ModuleTable from "./index";

Enzyme.configure({ adapter: new Adapter()});

describe("Test ModuleTable", () => {
    test("render  ModuleTable with empty columns & data", () => {
        const columns = [];
        const data = [];
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(false);
    })

    test("render ModuleTable with NULL columns & data", () => {
        const columns = null;
        const data = null;
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(false);
    })

    test('render ModuleTable with valid column & empty data',()=>{
        const columns = [{Header: 'Test'}];
        const data = [];
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(true);
        expect(tree.find("#module-data").exists()).toEqual(false);
    })

    test('render ModuleTable with empty column & valid data',()=>{
        const columns = [];
        const data = [{test:1}];
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(false);
        expect(tree.find("#module-data").exists()).toEqual(false);
    })

    test('render ModuleTable with valid column & valid data',()=>{
        const columns = [{Header: 'Test', accessor:'test'}];
        const data = [{test: 1}];
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(true);
        expect(tree.find("#module-data").exists()).toEqual(true);
    })

    test('render ModuleTable with column cell function',()=>{
        const columns = [{Header: 'Test-cell', Cell: ({row})=>'test cell',}];
        const data = [{}];
        const tree = shallow(<ModuleTable columns={columns} data={data}/>);
        expect(tree.find('.module-header').exists()).toEqual(true);
        expect(tree.find("#module-data").exists()).toEqual(true);
    })
})

test("Test ModuleTable snapshot", () => {
    const columns = [{Header: 'Test',accessor: 'test'}];
    const data = [{test: 'test 1'},{test:'test 2'}]
    const component = renderer.create(
        <ModuleTable columns={columns} data={data}/>,
      );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})