const initState = {
  users: [],
  loggedUser: [],
  tweets: [],
}

// Types
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST'
const UPDATE_LOGGED_USER = 'UPDATE_LOGGED_USER'

// Actions
export const updateUsersList = (usersList) => {
  let localUsers = JSON.parse(localStorage.getItem('users'))
  if (localUsers) {
    // some users are already in local storage
    // check if passedUsers are in local, if not update local
    usersList.forEach((user) => {
      if (!localUsers.some((lu) => lu.id === user.id)) {
        // add to local
        localUsers.push(user)
      }
    })

    // update local storage
    localStorage.setItem('users', JSON.stringify(localUsers))
  } else {
    // create users in local storage
    localUsers = [...usersList]
    localStorage.setItem('users', JSON.stringify(usersList))
  }

  return { type: UPDATE_USERS_LIST, localUsers }
}

export const updateLoggedUser = (loggedUser) => {
  // update local storage
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

  return { type: UPDATE_LOGGED_USER, loggedUser }
}

// Reducers
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USERS_LIST:
      return { ...state, users: action.usersList }
    case UPDATE_LOGGED_USER:
      return { ...state, users: action.loggedUser }
    default:
      return state
  }
}

export default rootReducer
