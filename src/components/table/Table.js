import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from
  '@/components/table/table.resize';
import {isCell, shouldResize, shiftKeyEvent, nextSelector} from
  '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'


export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  static className = 'excel__table'

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.changeTextInCell(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      console.log('resizedata', data)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.ctrlKey) {
        this.selection.addSelection($target)
      } else if (event.shiftKey) {
        const $current = this.selection.current
        shiftKeyEvent($target, $current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
          .map($cells => this.selection.selectGroup($cells))
      } else {
        console.log(event.target)
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowUp',
      'ArrowRight']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  changeTextInCell(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.changeTextInCell($(event.target).text())
  }
}

