import {handleUserClick} from './handlers'


export function renderAccount({nickname, account_id}){
  return `<div
            class="search-results_item js-user"
            data-id="${account_id}">
              ${nickname}
            </div>
          `
}

export function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
  const html = accounts.map(renderAccount).join('')
  const node = document.querySelector("#search-results").innerHTML = html
  for (let element of  document.querySelectorAll(".js-user")){
    element.addEventListener('click', handleUserClick)
  }

}

export function renderUserProfile({nickname, global_rating, statistics}){
  const stats = statistics.all
  const winsPercent = (stats.wins / stats.battles * 100).toFixed(2)
  document.querySelector('#profile').innerHTML = `
          <h3>${nickname}</h3>
          <div>
            <p>global rating: ${global_rating}</p>
            <p>battles: ${stats.battles}</p>
            <p>wins percent: ${winsPercent}%</p>
          </div>`
}
