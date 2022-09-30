import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';
import { Link,MemoryRouter as Router } from 'react-router-dom';
import ScheduleList from "components/Audit/Schedule/ScheduleList/ScheduleList.js";
import TableSchedule from "components/Audit/Schedule/ScheduleList/TableSchedule";
import ModalScheduleEdition from "components/Audit/Schedule/ScheduleList/Modal/ModalScheduleEdition";
import ModalScheduleRowDeletion from "components/Audit/Schedule/ScheduleList/Modal/ModalScheduleRowDeletion";
import ModalScheduleSeletedDeletion from "components/Audit/Schedule/ScheduleList/Modal/ModalScheduleSeletedDeletion";



Enzyme.configure({ adapter: new Adapter() });

describe("test ScheduleList", ()=>{
    it('includes link to ScheduleList scene', () => {                                       
        const wrapper = mount(<Router><ScheduleList/></Router>);
      expect(wrapper.find(Link)).toBeTruthy();
      expect(wrapper.find('Link').exists()).toEqual(true);                 
      });
})


describe("test Schedule table", ()=>{
    test('render table',()=>{
        const tree = shallow(<TableSchedule/>)
        expect(tree.find('.Scheduletable').exists()).toEqual(false)
    });
    test('table with empty',()=>{
        const column = [], 
        data = [],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableSchedule columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.Scheduletable').exists()).toEqual(true)
    })
    test('table with null',()=>{
        const column = null, 
        data = null,
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableSchedule columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.Scheduletable').exists()).toEqual(false)
    })
    test('table with 2 invalid value',()=>{
        const column = [1,2], 
        data = [1,'a'],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableSchedule columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.Scheduletable').exists()).toEqual(false)
    })
    test('table with 1 invalid value',()=>{
        const column = [1], 
        data = ['a'],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableSchedule columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.Scheduletable').exists()).toEqual(false)
    })
    test('table with 1 valid value',()=>{
        const column = [{Header: 'Auditor', accessor: 'auditor'}], 
        data = [[{name: 'what'}]],
        selectedRows=jest.fn(),
        setSelectedRows= jest.fn(),
        handleOpenAdd= jest.fn(),
        handleOpenDelete= jest.fn(),
        handleDataModalSearch= jest.fn();
        const tree = shallow(<TableSchedule columns={column} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOpenAdd={handleOpenAdd} handleOpenDelete={handleOpenDelete} handleDataModalSearch={handleDataModalSearch}/>);
        expect(tree.find('.Scheduletable').exists()).toEqual(true)
    })

    test('table with ModalDelete with EMPTY props',()=>{
        const isOpenRowDeleteModal=jest.fn(),
        hideOpenRowDeleteModal=jest.fn(),
        dataModal=jest.fn(),
        onSumbitDeleteRow=jest.fn(),
        tree = shallow(<ModalScheduleRowDeletion
            isOpenRowDeleteModal = { isOpenRowDeleteModal}
            hideOpenRowDeleteModal = {hideOpenRowDeleteModal}
            dataModal = { dataModal}
            onSumbitDeleteRow = { onSumbitDeleteRow} 
        />)
        expect(tree.find('.RowDeletion').exists()).toEqual(true)
    })
    test('render ModalAdd with EMPTY props',()=>{
        const isOpenAdd = jest.fn(),
        id = jest.fn(),
        handChange = jest.fn(),
        form = jest.fn(),
        handleSubmit = jest.fn(),
        errors =jest.fn(),
        closeModal = jest.fn(),
        tree = shallow(<ModalScheduleEdition
            isOpenAdd = {isOpenAdd} 
            id = {id} 
            handChange = {handChange}
            form={form}
            handleSubmit={handleSubmit}
            errors={errors}
            closeModal={closeModal}
        />)
        expect(tree.find('.Edition').exists()).toEqual(true);
    })
})