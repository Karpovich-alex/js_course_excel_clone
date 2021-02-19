import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
    this.page = null
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    let Page
    if (ActiveRoute.params[0] === 'excel') {
      if (!ActiveRoute.param) {
        const newPath = window.location.protocol + '//' +
          window.location.host +
          window.location.pathname +
          Date.now().toString()
        window.location.replace(newPath)
      }
      Page = this.routes.excel
    } else {
      Page = this.routes.dashboard
    }
    if (this.page) {
      this.page.destroy()
    }
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.clear()
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange')
  }
}
