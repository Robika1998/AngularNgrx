import { createReducer, on } from '@ngrx/store';
import {
  addassociatesuccess,
  deleteassociatesuccess,
  getassociatesuccess,
  loadassociatefail,
  loadassociatesuccess,
  openpopup,
  updateassociatesuccess,
} from './Associate.Actions';
import { AssociateState } from './Associate.State';

const _AssociateReducer = createReducer(
  AssociateState,
  on(loadassociatesuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      erromesage: '',
    };
  }),
  on(getassociatesuccess, (state, action) => {
    return {
      ...state,
      associateobj: action.obj,
      erromesage: '',
    };
  }),
  on(loadassociatefail, (state, action) => {
    return {
      ...state,
      list: [],
      erromesage: action.errormessage,
    };
  }),
  on(addassociatesuccess, (state, action) => {
    const _maxid = Math.max(...state.list.map((o) => o.id));
    const _newdata = { ...action.inputdata };
    _newdata.id = _maxid + 1;
    return {
      ...state,
      list: [...state.list, _newdata],
      erromesage: '',
    };
  }),
  on(updateassociatesuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.id === action.inputdata.id ? action.inputdata : o;
    });
    return {
      ...state,
      list: _newdata,
      erromesage: '',
    };
  }),
  on(deleteassociatesuccess, (state, action) => {
    const _newdata = state.list.filter((o) => o.id !== action.code);
    return {
      ...state,
      list: _newdata,
      erromesage: '',
    };
  }),
  on(openpopup, (state, action) => {
    return {
      ...state,
      associateobj: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        type: 'CUSTOMER',
        address: '',
        associategroup: 'level1',
        status: true,
      },
    };
  })
);

export function AssociateReducer(state: any, action: any) {
  return _AssociateReducer(state, action);
}
