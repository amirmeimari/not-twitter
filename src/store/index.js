import { store } from '../index'

const initState = {
  users: [],
  loggedUser: [],
  tweets: [],
}

// Types
const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST'
const UPDATE_LOGGED_USER = 'UPDATE_LOGGED_USER'
const UPDATE_TWEETS_LIST = 'UPDATE_TWEETS_LIST'

// Actions
export const updateUsersList = (usersList) => {
  const users = handleUpdateLocal('users', usersList)
  return { type: UPDATE_USERS_LIST, users }
}

export const updateLoggedUser = (loggedUser) => {
  // update local storage
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

  return { type: UPDATE_LOGGED_USER, loggedUser }
}

export const updateTweetsList = (tweetsList) => {
  const tweets = handleUpdateLocal('tweets', tweetsList)
  return { type: UPDATE_TWEETS_LIST, tweets }
}

export const addNewTweet = (newTweet) => {
  let tweets = [...store.getState().tweets]
  tweets.unshift(newTweet)
  tweets = handleUpdateLocal('tweets', tweets)
  return { type: UPDATE_TWEETS_LIST, tweets }
}

export const addReaction = (reaction, tweetId) => {
  let tweets = [...store.getState().tweets]
  // find the target tweet
  const targetTweetIndex = tweets.findIndex(
    (tweet) => tweet.tweet_id === tweetId,
  )
  // add reaction
  tweets[targetTweetIndex].reaction = reaction

  /// update local and state
  localStorage.setItem('tweets', JSON.stringify(tweets))
  return { type: UPDATE_TWEETS_LIST, tweets }
}

// Reducers
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USERS_LIST:
      return { ...state, users: action.users }
    case UPDATE_LOGGED_USER:
      return { ...state, loggedUser: action.loggedUser }
    case UPDATE_TWEETS_LIST:
      return { ...state, tweets: action.tweets }

    default:
      return state
  }
}

export default rootReducer

// utils
const handleUpdateLocal = (kind, list) => {
  let localList = JSON.parse(localStorage.getItem(kind))
  if (localList) {
    // some items are already in local storage
    // check if list are in local, if not update local
    list.forEach((item) => {
      if (kind === 'tweets') {
        if (!localList.some((ll) => ll.tweet_id === item.tweet_id)) {
          // add to local
          localList.unshift(item)
        }
      } else if (kind === 'users') {
        if (!localList.some((ll) => ll.user_id === item.user_id)) {
          // add to local
          localList.push(item)
        }
      }
    })

    // update local storage
    localStorage.setItem(kind, JSON.stringify(localList))
  } else {
    // create users in local storage
    localList = [...list]
    localStorage.setItem(kind, JSON.stringify(list))
  }

  return localList
}
