import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel'
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Header} from '@/components/header/Header';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {initialState} from '@/redux/initialState';

function storageName(param) {
  return 'excel:'+ param
}

export class ExcelPage extends Page {
  getRoot() {
    const storagename = storageName(this.params)
    const store = createStore(rootReducer, initialState(storagename))

    const stateListener = debounce(state => {
      storage(storagename, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
