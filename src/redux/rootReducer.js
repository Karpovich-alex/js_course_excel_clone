import {TABLE_RESIZE} from '@/redux/types';
import {cellWidth} from '@core/consts';

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
  case TABLE_RESIZE:
    prevState = state.colState || {}
    if (action.data.value===cellWidth) {
      return {...state.filter(data => data !== action.data.id)}
    }
    prevState[action.data.id] = action.data.value
    return {...state, colState: prevState}
  default: return state
  }
}
