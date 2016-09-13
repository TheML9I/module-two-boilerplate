const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  // create request to the url and return a promise
  return fetch(url)
  .then(resp => {    
    return resp.json()
  })
  .then(json => new Promise(function(resolve, reject){
    if(json.status == "ok"){
      resolve(json.data)
    } else {
      reject(json.error.message)
    }
  }))

}

function toggleSpinner() {
  // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.querySelector("#spinner")
  spinner.classList.toggle("show")
}

function renderAccount({nickname, account_id}){
  return `<div
            class="search-results_item js-user"
            data-id="${account_id}">
              ${nickname}
            </div>
          `
}

function renderSearchResult(accounts) {
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

function showError(msg){
  alert(msg)
}

function makeRequest(url){
  toggleSpinner()
  return fetch(url)
  .then(resp => {
    toggleSpinner()
    return resp.json()
  })
  .then(json => new Promise(function(resolve, reject){
    if(json.status == "ok"){
      resolve(json.data)
    } else {
      reject(json.error.message)
    }
  }))
}

function handleSearchClick(){
  const username = document.querySelector("#username").value
  loadUsers(username)
  .then(data => {
    if(!data.length){
      showError('nothing found')
    }
    renderSearchResult(data)})
  .catch(msg => showError(msg))
}

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const btn = document.querySelector("#search")
  btn.addEventListener('click', handleSearchClick)
})


function loadProfile(account_id){
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`
  return makeRequest(url)
  .then(data => data[account_id])
}

function renderUserProfile({nickname, global_rating, statistics}){
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


function handleUserClick(e){
  const userNode = e.target
  const account_id = userNode.dataset.id
  loadProfile(account_id)
  .then(data => renderUserProfile(data))

}
