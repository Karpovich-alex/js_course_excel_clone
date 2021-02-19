import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@core/consts';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTitle,
  tableCreateTime: Date.now().toString(),
  updateTable: Date.now().toString()
}

export function initialState(state) {
  return storage(state) ? storage(state) : storage(state, defaultState)
}
