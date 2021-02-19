import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if ( !selector) {
      throw new Error('Selector is required')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
    this.page =null
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    let Page
    console.log('ROUTES', this.routes)
    if (ActiveRoute.params[0] === 'excel') {
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
