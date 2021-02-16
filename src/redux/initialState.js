import {storage} from '@core/utils';
import {defaultStyles} from '@core/consts';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  styleState: {}
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
