import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';

import TableEvaluate from "components/Audit/Schedule/Detail/Evaluate/TableEvaluate";
import Evaluate from "components/Audit/Schedule/Detail/Evaluate/Evaluate";
import ModalDetailRowDeletion from "components/Audit/Schedule/Detail/Modal/ModalDetailRowDeletion";
import ModalDetailSearch from "components/Audit/Schedule/Detail/Modal/ModalDetailSearch";


Enzyme.configure({ adapter: new Adapter() });
describe("test evaluate", ()=>{
    test('render evaluate',()=>{
        const tree = shallow(<Evaluate/>)
        expect(tree.find('.evaluate').exists()).toEqual(true)
    });
})

describe("test evaluate table", ()=>{
    test('render evaluate table',()=>{
        const tree = shallow(<TableEvaluate/>)
        expect(tree.find('.evaluatetable').exists()).toEqual(false)
    });
    test('table with empty',()=>{
        const column = [], 
        data = [],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableEvaluate columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.evaluatetable').exists()).toEqual(true)
    })
    test('table with null',()=>{
        const column = null, 
        data = null,
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableEvaluate columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.evaluatetable').exists()).toEqual(false)
    })
    test('table with two invalid',()=>{
        const column = [1,2], 
        data = [3,4],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableEvaluate columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.evaluatetable').exists()).toEqual(false)
    })
    test('table with one invalid',()=>{
        const column = 1, 
        data = 2,
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableEvaluate columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.evaluatetable').exists()).toEqual(false)
    })
    test('table with valid value',()=>{
        const column = [{Header: 'Question', accessor: 'question'}], 
        data = [[{name: 'what'}]],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableEvaluate columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.evaluatetable').exists()).toEqual(true)
    })

    test('table with ModalDelete with EMPTY props',()=>{
        const isOpenRowDeleteModal=jest.fn(),
        hideOpenRowDeleteModal=jest.fn(),
        dataModal=jest.fn(),
        onSumbitDeleteRow=jest.fn(),
        tree = shallow(<ModalDetailRowDeletion
            isOpenRowDeleteModal = { isOpenRowDeleteModal}
            hideOpenRowDeleteModal = {hideOpenRowDeleteModal}
            dataModal = { dataModal}
            onSumbitDeleteRow = { onSumbitDeleteRow} 
        />)
        expect(tree.find('.modal-delete').exists()).toEqual(true)
    })

    test('table with Modalsearch with EMPTY ',()=>{
        const isOpenSearch=jest.fn(),
        hideModalSearch=jest.fn(),
        dataModal=jest.fn(),
        tree = shallow(<ModalDetailSearch
            isOpenSearch={isOpenSearch} 
            hideModalSearch={hideModalSearch} 
            dataModal={dataModal}
        />)
        expect(tree.find('.modal-search').exists()).toEqual(true)
    })

})