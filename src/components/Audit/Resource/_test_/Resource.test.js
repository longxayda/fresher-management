import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"  
import {Provider} from "react-redux";
import store from "redux/store";
import { shallow, mount } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });



import Resource from "components/Audit/Resource/Resource"
import TableResource from  "components/Audit/Resource/TableResource"
import ModalAddEditResource from   "components/Audit/Resource/ModalResource/ModalAddEditResource"
import ModalDeleteResource from "components/Audit/Resource/ModalResource/ModalDeleteResource"
import ModalDetailResource from "components/Audit/Resource/ModalResource/ModalDetailResource"



describe("rendering components", ()=>{

    test('render Resource', ()=>{
        const tree = mount (<Provider store={store}><Resource/> </Provider>)
        expect(tree.find('.resource').exists()).toEqual(true)
    })
    
})
