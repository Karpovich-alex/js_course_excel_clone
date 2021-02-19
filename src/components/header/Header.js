import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown', 'click'],
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

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
        `
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Действительно удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('#')
    }
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
