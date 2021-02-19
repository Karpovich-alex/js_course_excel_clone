import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TABLE_NAME,
  TABLE_RESIZE,
  UPDATE_TABLE
} from '@/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyle(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeTableName(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data
  }
}

export function updateTable() {
  return {
    type: UPDATE_TABLE
  }
}
