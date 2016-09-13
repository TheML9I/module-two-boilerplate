import './main.css'
import {loadUsers, loadProfile} from './loaders'
import { handleSearchClick } from './handlers'
import {renderAccount, renderSearchResult, renderUserProfile} from './views'
/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const btn = document.querySelector("#search")
  btn.addEventListener('click', handleSearchClick)
})
