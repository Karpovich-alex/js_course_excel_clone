import {$} from '@core/dom'
import {Emiter} from '@core/Emiter'
import {StoreSubscriber} from '@core/store/StoreSubscriber';
import {updateTable} from '@/redux/actions';

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.emitter = new Emiter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  storeChanged(changes) {}

  init() {
    this.store.dispatch(updateTable())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
