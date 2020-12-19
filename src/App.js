import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Details from './views/Details'
import axios from 'axios'
import { connect } from 'react-redux'

import {
  updateUsersList,
  updateLoggedUser,
  updateTweetsList,
} from './store/index'

// local data
import localUsers from './data/users.json'
import localTweets from './data/tweets.json'

const App = ({ dispatch }) => {
  const BASE_URL = process.env.REACT_APP_BASE_API_ADDRESS
  const cancelFetchUsersList = axios.CancelToken.source()
  const cancelFetchTweets = axios.CancelToken.source()

  useEffect(() => {
    // fetch users list from API
    fetchUsersList()
    handleUpdateLoggedUser()
    fetchTweets()

    return () => {
      cancelFetchUsersList.cancel()
      cancelFetchTweets.cancel()
    }
  }, [])

  const fetchUsersList = async () => {
    try {
      // fake fetch request
      await axios.get(`${BASE_URL}/users/`, {
        CancelToken: cancelFetchUsersList.token,
      })
      // update users list with local data
      dispatch(updateUsersList(localUsers))
    } catch (e) {
      console.log(`An error occurred white fetching users list`, e)
    }
  }

  const handleUpdateLoggedUser = () => {
    // in real cases logged user should be fetch and authenticated even before app loaded, for example after login, but here it's not the case so i will not send request, just update local storage and store
    dispatch(updateLoggedUser(localUsers[0]))
  }

  const fetchTweets = async () => {
    try {
      // fake fetch request
      await axios.get(`${BASE_URL}/posts/`, {
        CancelToken: cancelFetchTweets.token,
      })
      // update tweets with local data
      dispatch(updateTweetsList(localTweets))
    } catch (e) {
      console.log(`An error occurred white fetching tweets`, e)
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tweet/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  )
}

export default connect()(App)
