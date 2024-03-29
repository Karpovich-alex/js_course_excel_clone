import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter

    this.subscribe = options.subscribe || []

    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null
    this.prepare()
  }
  // Настраиваем компонент до init
  prepare() {}

  toHTML() {
    return ''
  }
  // Уведомляем слушателей о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
