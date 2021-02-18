import {$} from '@core/dom';
import {cellWidth, minHeight, minWidth, rowHeight} from '@core/consts';

export function resizeHandler($root, event) {
  return new Promise( resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({
      'opacity': 1,
      [sideProp]: '-5000px',
      'user-select': 'none'
    })

    document.ondblclick = () => {
      if (type === 'col') {
        setColumnSize($root, $parent, cellWidth)
      } else {
        value = rowHeight
        $parent.css({'height': rowHeight + 'px'})
      }
    }

    document.onmousemove = e => {
      if (type === 'col') {
        let delta = e.pageX - coords.right
        value = coords.width + delta
        if (value < minWidth) {
          delta = (minWidth - coords.width)
          value = minWidth
        }
        $resizer.css({right: -delta + 'px'})
      } else {
        let delta = e.pageY - coords.bottom
        value = coords.height + delta
        if (value < minHeight) {
          delta = (minHeight - coords.height)
          value = minHeight
        }
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col') {
        setColumnSize($root, $parent, value)
        $resizer.css({
          right: 0,
          bottom: '0px'
        })
      } else {
        $parent.css({'height': value + 'px'})
        $resizer.css({
          bottom: 0,
          right: '0px'
        })
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
      })
    }
  })
}

function setColumnSize($root, $el, value) {
  $el.css({'width': value + 'px'})
  $root.findAll(`[data-col="${$el.data.col}"]`)
    .forEach(el => el.style.width = value + 'px')
}
