import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';
import {cellWidth, rowHeight} from '@core/consts';

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
  case TABLE_RESIZE:
    if (action.data.type === 'col') {
      prevState = state.colState || {}
      if (action.data.value===cellWidth || !action.data.value) {
        delete state.colState[action.data.id]
        return state
      }
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState}
    } else {
      prevState = state.rowState || {}
      if (action.data.value===rowHeight || !action.data.value) {
        delete state.rowState[action.data.id]
        return state
      }
      prevState[action.data.id] = action.data.value
      return {...state, rowState: prevState}
    }
  case CHANGE_TEXT:
    prevState=state['dataState'] || {}
    prevState[action.data.id] = action.data.value
    return {...state, currentText: action.data.value, dataState: prevState}
  default: return state
  }
}
