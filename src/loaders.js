const API_PROXY_URL = 'http://188.166.73.133/wg-api';

const GAME = 'wot';

function toggleSpinner() {
    // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.querySelector('#spinner');
  spinner.classList.toggle('show');
}

function makeRequest(url) {
  toggleSpinner();
  return fetch(url)
        .then((resp) => {
          toggleSpinner();
          return resp.json();
        })
        .then(json => new Promise((resolve, reject) => {
          if (json.status === 'ok') {
            resolve(json.data);
          } else {
            reject(json.error.message);
          }
        }));
}

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`;
    // create request to the url and return a promise
  return fetch(url)
        .then(resp => resp.json())
        .then(json => new Promise((resolve, reject) => {
          if (json.status === 'ok') {
            resolve(json.data);
          } else {
            reject(json.error.message);
          }
        }));
}

function loadProfile(accountId) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${accountId}`;
  return makeRequest(url)
        .then(data => data[accountId]);
}

module.exports = {
  loadUsers,
  loadProfile,
};
