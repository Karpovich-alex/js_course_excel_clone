import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TABLE_NAME,
  TABLE_RESIZE,
  UPDATE_TABLE
} from '@/redux/types';
import {cellWidth, defaultStyles, rowHeight} from '@core/consts';

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
  case TABLE_RESIZE:
    if (action.data.type === 'col') {
      prevState = state.colState || {}
      if (action.data.value === cellWidth || !action.data.value) {
        delete state.colState[action.data.id]
        return state
      }
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState}
    } else {
      prevState = state.rowState || {}
      if (action.data.value === rowHeight || !action.data.value) {
        delete state.rowState[action.data.id]
        return state
      }
      prevState[action.data.id] = action.data.value
      return {...state, rowState: prevState}
    }

  case CHANGE_TEXT:
    prevState = state['dataState'] || {}
    if (action.data.value === '') {
      delete state.dataState[action.data.id]
    } else {
      prevState[action.data.id] = action.data.value
    }
    return {...state, currentText: action.data.value, dataState: prevState}

  case CHANGE_STYLES:
    return {...state, currentStyles: action.data.styles}

  case APPLY_STYLE:
    prevState = state['styleState'] || {}
    action.data.ids.forEach(id => {
      prevState = changeCellStyle(action.data.styles, id, prevState)
    })
    return {
      ...state,
      currentStyles: action.data.styles,
      styleState: prevState
    }

  case CHANGE_TABLE_NAME:
    return {...state, tableName: action.data}

  case UPDATE_TABLE:
    return {...state, updateTable: Date.now().toString()}
  default:
    return state
  }
}

function changeCellStyle(styles, id, state) {
  Object.keys(styles).forEach(style => {
    if (state[id]
      &&
      state[id][style]
      &&
      styles[style] === defaultStyles[style]

    ) {
      delete state[id][style]
      if (state[id]) {
        delete state[id]
      }
    } else if (styles[style] !== defaultStyles[style]) {
      const prevCellState = state[id] || {}
      state[id] = {
        ...prevCellState,
        [style]: styles[style]
      }
    }
  })
  return state
}
