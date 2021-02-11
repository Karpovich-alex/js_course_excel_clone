import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
      super($root, {
        name: 'Toolbar',
        listeners: ['click'],
        ...options
      })
    }

    toHTML() {
      return `
        <div class="button">
              <i class="material-icons">align_horizontal_left
              </i>
          </div>
          <div class="button">
              <i class="material-icons">align_horizontal_right
              </i>
          </div>
          <div class="button">
              <i class="material-icons">align_horizontal_center
              </i>
          </div>
          <div class="button">
              <i class="material-icons">format_bold</i>
          </div>
          <div class="button">
              <i class="material-icons">format_italic</i>
          </div>
          <div class="button">
              <i class="material-icons">format_underlined</i>
          </div>
        `
    }
    onClick(event) {
      console.log(event.target)
    }
}
