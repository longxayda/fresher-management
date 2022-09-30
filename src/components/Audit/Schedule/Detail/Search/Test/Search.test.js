import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';

import SearchTable from "components/Audit/Schedule/Detail/Search/TableSearch";
import Search from "components/Audit/Schedule/Detail/Search/Search";
import ModalDetailAdd from "components/Audit/Schedule/Detail/Modal/ModalDetailAdd";
Enzyme.configure({ adapter: new Adapter() });
describe("test search", ()=>{
    test('render search',()=>{
        const tree = shallow(<Search/>)
        expect(tree.find('.search').exists()).toEqual(true)
    });
})

describe("test search table", ()=>{
    test('render search table',()=>{
        const tree = shallow(<SearchTable/>)
        expect(tree.find('.searchtable').exists()).toEqual(false)
    });
    test('table with empty',()=>{
        const column = [], 
        data = [],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<SearchTable columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.searchtable').exists()).toEqual(true)
    })
    test('table with null',()=>{
        const column = null, 
        data = null,
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<SearchTable columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.searchtable').exists()).toEqual(false)
    })
    test('table with two invalid values',()=>{
        const column = [1,2], 
        data = [3,4],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<SearchTable columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.searchtable').exists()).toEqual(false)
    })
    test('table with one invalid value',()=>{
        const column = 2, 
        data = 2,
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<SearchTable columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.searchtable').exists()).toEqual(false)
    })
    test('table with valid value',()=>{
        const column = [{Header: 'Question', accessor: 'question'}], 
        data = [[{name: 'what'}]],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<SearchTable columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.searchtable').exists()).toEqual(true)
    })

    test('render ModalAdd with EMPTY props',()=>{
        const isOpenAdd = jest.fn(),
        id = jest.fn(),
        handChange = jest.fn(),
        form = jest.fn(),
        handleSubmit = jest.fn(),
        errors =jest.fn(),
        closeModal = jest.fn(),
        tree = shallow(<ModalDetailAdd 
            isOpenAdd = {isOpenAdd} 
            id = {id} 
            handChange = {handChange}
            form={form}
            handleSubmit={handleSubmit}
            errors={errors}
            closeModal={closeModal}
        />)
        expect(tree.find('.modal-add').exists()).toEqual(true);
    })
})