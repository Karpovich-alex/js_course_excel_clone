import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize, shiftKeyEvent} from
  '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';


export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  static className = 'excel__table'

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
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
        this.selection.select($target)
      }
    }
  }
}
