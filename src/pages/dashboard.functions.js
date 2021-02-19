import {storage} from '@core/utils';

export function toHTML(tableName = 'Таблица номер 1', tableLink = '') {
  const tableId = tableLink.split(':')[1]
  return `
    <li class="db__record">
          <a href="#excel/${tableId}">${tableName}</a>
          <strong>12.06.2020</strong>
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
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${keys.map(tableLink => {
    const tableState = storage(tableLink)
    const tableName = tableState['tableName']
    return toHTML(tableName, tableLink)
  }).join('')}
      </ul>
`
}
