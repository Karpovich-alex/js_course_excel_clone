import {CHANGE_CELL_STYLE, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE}
  from '@/redux/types';
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
    if (action.data.id) {
      prevState = state['styleState'] || {}
      Object.keys(action.data.styles).forEach(style => {
        if (state.styleState[action.data.id]
          &&
          state.styleState[action.data.id][style]
          &&
          action.data.styles[style] === defaultStyles[style]

        ) {
          delete state.styleState[action.data.id][style]
          if (state.styleState[action.data.id]) {
            delete state.styleState[action.data.id]
          }
        } else if (action.data.styles[style] !== defaultStyles[style]) {
          const prevCellState = prevState[action.data.id] || {}
          prevState[action.data.id] = {
            ...prevCellState,
            [style]: action.data.styles[style]
          }
        }
      })
      return {...state,
        currentStyles: action.data.styles,
        styleState: prevState}
    }
    return {...state, currentStyles: action.data.styles}

  case CHANGE_CELL_STYLE:
    console.log(action)
    prevState = state['stylesState'] || {}
    Object.keys(action.data).forEach(style => {
      if (action.data[style] === defaultStyles[style]) {
        delete state.styleState[style]
      } else {
        prevState[style] = action.data[style]
      }
    })
    return {...state, styleState: prevState}
  default:
    return state
  }
}
