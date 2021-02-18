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

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
