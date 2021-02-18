import {storage} from '@core/utils';
import {defaultStyles} from '@core/consts';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
