import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
      super($root, {
        'name': 'Formula',
        'listeners': ['input', 'keydown'],
        ...options
      })
    }

    init() {
      super.init()
      this.$formula = this.$root.find('#formula')
      this.$on('table:select', $cell => {
        this.$formula.text($cell.text())
      })

      this.$subscribe(state => {
        this.$formula.text(state.currentText)
      })
      // this.$on('table:input', $cell => {
      //   this.$formula.text($cell.text())
      // })
    }

    toHTML() {
      return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false">
        </div>
        `
    }

    onInput(event) {
      const test = $(event.target).text()
      this.$emit('formula:input', test)
    }

    onKeydown(event) {
      const keys = ['Enter', 'Tab']
      const {key} = event
      if (keys.includes(key)) {
        event.preventDefault()
        this.$emit('formula:done')
      }
    }
}
