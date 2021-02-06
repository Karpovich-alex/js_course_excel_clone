export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.classList.value === 'cell'
}

export function shiftKeyEvent($selectedCell, $current) {
  const startPos = {
    'col': +$current.data.col,
    'row': +$current.data.row
  }
  const selectedPos = {
    'col': +$selectedCell.data.col,
    'row': +$selectedCell.data.row
  }
  const cols = range(startPos.col, selectedPos.col)
  const rows = range(startPos.row, selectedPos.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}
