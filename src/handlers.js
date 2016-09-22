import { loadUsers, loadProfile } from './loaders';
import { renderSearchResult, renderUserProfile } from './views';

function showError(msg) {
  alert(msg);
}

export function handleSearchClick() {
  const username = document.querySelector('#username').value;
  loadUsers(username)
      .then((data) => {
        if (!data.length) {
          showError('nothing found');
        }
        renderSearchResult(data);
      })
      .catch(msg => showError(msg));
}

export function handleUserClick(e) {
  const userNode = e.target;
  const accountId = userNode.dataset.id;
  loadProfile(accountId)
      .then(data => renderUserProfile(data));
}
