import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@core/consts';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  init() {
    super.init()
    // this.$on('table:select', $cell => {
    //   const newState = $cell.getStyles(Object.keys(defaultStyles))
    //   this.setState(newState)
    //   console.log(newState)
    // })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged(changes) {
    console.log('toolbardata', changes)
    this.setState(changes.currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      // const key = Object.keys(value)[0]
      console.log('APPLY STYLES', value)
      const data = {...this.state, ...value}
      this.$emit('toolbar:applyStyle', data)
      // this.setState({[key]: value[key]})
    }
  }
}
