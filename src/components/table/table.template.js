import {cellWidth, defaultStyles, rowHeight} from '@core/consts';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

function toCell(row, state) {
  return (_, col) => {
    const dataId=`${row}:${col}`
    const cellData = state.dataState[dataId] || ''
    const width = getWidth(state.colState, col)
    const cellStyle = {...defaultStyles, ...state.styleState[dataId]}
    const styles = Object.keys(cellStyle)
      .map(key => `${camelToDashCase(key)}: ${cellStyle[key]}`)
      .join(';')
    return `
    <div class="cell" 
    contenteditable 
    data-col="${col}" 
    data-row="${row}"
    data-id="${dataId}"
    data-value="${cellData}"
    style="width: ${width}; ${styles}"
    >${parse(cellData)}</div>
    `
  }
}

function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

function toColumn({col, index, width}) {
  return `
    <div class="column" 
    data-type="resizable" 
    data-col="${index}" 
    style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content, state= {}) {
  // eslint-disable-next-line max-len
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div class="row" 
    data-type="resizable" 
    data-row="${index}" 
    style="height: ${height}">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state, index)
    }
  }
}

function getWidth(state, index) {
  return (state[index] || cellWidth) + 'px'
}

function getHeight(state, index) {
  return (index ? (state[index] || rowHeight) : rowHeight) + 'px'
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const colState = state.colState || {}
  const rowState = state.rowState || {}
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(colState))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(i, state))
      .join('')
    rows.push(createRow(i + 1, cells, rowState))
  }

  return rows.join('')
}
