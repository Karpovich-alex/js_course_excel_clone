import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  const minWidth = 40
  const minHeight = 20
  $resizer.css({
    'opacity': 1,
    [sideProp]: '-5000px',
    'user-select': 'none'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      let delta = e.pageX - coords.right
      value = coords.width + delta
      if (value < minWidth) {
        delta = (minWidth - coords.width)
      }
      $resizer.css({right: -delta + 'px'})
    } else {
      let delta = e.pageY - coords.bottom
      value = coords.height + delta
      if (value < minHeight) {
        delta = (minHeight - coords.height)
      }
      $resizer.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({'width': value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
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
    $resizer.css({
      opacity: 0,
    })
  }
}
