import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, render } from 'enzyme';

import Auditor from 'components/Audit/AuditorList/Auditor'
import AuditorTable from 'components/Audit/AuditorList/AuditorTable'

Enzyme.configure({ adapter: new Adapter() });


describe('Auditor', () => {
    describe('Modal', () => {
        test('Test Modal is not show at initial', () => {
            const wrapperAudit = shallow(<Auditor />)
            expect(wrapperAudit.find('.addModal').exists()).toEqual(true);
            expect(wrapperAudit.find('.addModal').props().show).toEqual(false);
            expect(wrapperAudit.find('.delModal').exists()).toEqual(true);
            expect(wrapperAudit.find('.delModal').props().show).toEqual(false);
        });
        test('Test Add Modal is show when button is clicked', () => {
            const column = [], data = []
            const wrapperTable = shallow(<AuditorTable
                columns={column}
                data={data}
            />);
            wrapperTable.find('.addAuditorBtn').props().onClick();
            expect(setShowModal).toHaveBeenCalledWith(true);
        });
        test('Test Delete Modal is show when button is clicked', () => {
            const column = [], data = []
            const wrapperTable = shallow(<AuditorTable
                columns={column}
                data={data}
            />);
            wrapperTable.find('.delAuditorBtn').props().onClick();
            expect(setShowModalDel).toHaveBeenCalledWith(true);
        });
    })

    describe('AuditorTable', () => {
        test('renders AuditorTable with EMPTY Data', () => {
            const column = [], data = [];
            const wrapper = shallow(<AuditorTable
                columns={column}
                data={data}
                />);
            expect(wrapper.find('.noAuditor').exists()).toEqual(true);
        });
        test('renders AuditorTable with NULL Data', () => {
            const column = [{ Header: 'ID', accessor: 'id' }], data = null, selectedRows = [];

            const wrapper = shallow(<AuditorTable
                columns={column}
                data={data}
            />);
            expect(wrapper.find('.auditorTable').exists()).toEqual(false);
        });
        test('renders AuditorTable with INVALID Data', () => {
            const column = [{ Header: 'ID', accessor: 'id' }], data = [3, 5], selectedRows = [];

            const wrapper = shallow(<AuditorTable
                columns={column}
                data={data}

            />);
            expect(wrapper.find('.auditorTable').exists()).toEqual(true);
        });
        test('renders AuditorTable with VALID Data', () => {
            const column = [{ Header: 'ID', accessor: 'id' }], data = [{'id':'1', 'id':'2'}], selectedRows = [];
            const wrapper = shallow(<AuditorTable
                columns={column} 
                data={data}
            />);
            expect(wrapper.find('.auditorTable').exists()).toEqual(true);
        });
    })
});

