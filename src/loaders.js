
const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'


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

function toggleSpinner() {
  // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.querySelector("#spinner")
  spinner.classList.toggle("show")
}

function loadUsers (username) {
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

function loadProfile(account_id){
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`
  return makeRequest(url)
  .then(data => data[account_id])
}

module.exports = {
  loadUsers,
  loadProfile
}
