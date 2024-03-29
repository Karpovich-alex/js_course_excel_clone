export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current=null
  }
  // $el is instance of Dom

  select($el) {
    this.clear()
    this.group.push($el)
    this.current=$el
    $el.focus().addClass(TableSelection.className)
  }

  get selectedIds() {
    return this.group.map(el => el.id())
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  addSelection($el) {
    this.group.push($el)
    this.current=$el
    $el.addClass(TableSelection.className)
  }

  selectGroup($group) {
    this.group.push($group)
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
