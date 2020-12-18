const initState = {
  users: [],
  loggedUser: [],
  tweets: [],
}

// Types
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST'

// Actions
export const updateUsersList = (usersList) => {
  return { type: UPDATE_USERS_LIST, usersList }
}

// Reducers
// Reducers
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USERS_LIST:
      return { ...state, users: action.usersList }
    default:
      return state
  }
}

export default rootReducer
