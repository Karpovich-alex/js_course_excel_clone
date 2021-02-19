import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@core/consts';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTitle
}

export function initialState(state) {
  return storage(state) ? storage(state) : storage(state, defaultState)
}
