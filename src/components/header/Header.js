import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  prepare() {
    super.prepare()
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const tableName = this.store.getState().tableName
    return `
        <input type="text" class="input" value="${tableName}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
        `
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    const {key} = event
    if (keys.includes(key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  onInput(event) {
    const text = $(event.target).text()
    console.log(text)
    this.$dispatch(actions.changeTableName(text))
  }
}
