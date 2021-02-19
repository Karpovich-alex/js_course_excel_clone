import {storage} from '@core/utils';

export function toHTML(tableLink) {
  const tableState = storage(tableLink)
  const tableId = tableLink.split(':')[1]
  const tableName = tableState['tableName']
  return `
    <li class="db__record">
          <a href="#excel/${tableId}">${tableName}</a>
          <strong>
            ${new Date(+tableState['updateTable']).toLocaleDateString()}
            ${new Date(+tableState['updateTable']).toLocaleTimeString()}
          </strong>
     </li>
`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if ( !key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createTableRecords() {
  const keys = getAllKeys()
  console.log(keys)
  if ( !keys.length) {
    return `<p>Пока таблиц нет</p>`
  }

  return `<div class="db__list-header">
        <span>Название</span>
        <span>Дата Изменения</span>
      </div>

      <ul class="db__list">
        ${keys.map(toHTML).join('')}
      </ul>
`
}
