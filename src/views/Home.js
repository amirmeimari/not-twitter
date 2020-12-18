import { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  updateUsersList,
  updateLoggedUser,
  updateTweetsList,
} from '../store/index'

// local data
import localUsers from '../data/users.json'
import localTweets from '../data/tweets.json'

import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = ({ dispatch, tweets, users, loggedUser }) => {
  const BASE_URL = process.env.REACT_APP_BASE_API_ADDRESS

  useEffect(() => {
    // fetch users list from API
    fetchUsersList()
    handleUpdateLoggedUser()
    fetchTweets()
  }, [])

  const fetchUsersList = async () => {
    try {
      // fake fetch request
      await axios.get(`${BASE_URL}/users/`)
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
      await axios.get(`${BASE_URL}/posts/`)
      // update tweets with local data
      dispatch(updateTweetsList(localTweets))
    } catch (e) {
      console.log(`An error occurred white fetching tweets`, e)
    }
  }

  const renderTweets = tweets.map((tweet) => {
    // get user info
    const user = users.find((user) => user.id === tweet.userId)
    return <Tweet key={tweet.id} content={{ ...tweet, ...user }} />
  })

  const handleSetNewTweetText = (v) => {
    console.log(v)
  }

  const handleSubmitNewTweet = () => {
    console.log('wdawd')
  }

  return (
    <>
      <Layout>
        <Header title="Home" />
        <NewTweet
          text={handleSetNewTweetText}
          onSubmit={() => handleSubmitNewTweet()}
          avatar={loggedUser.avatar}
        />
        <Divider big />

        {renderTweets}

        <Modal title="Reply">
          <Tweet reply />
          <NewTweet reply />
        </Modal>
      </Layout>
    </>
  )
}

const mapStateTpProps = (state) => {
  return {
    users: state.users,
    tweets: state.tweets,
    loggedUser: state.loggedUser,
  }
}

export default connect(mapStateTpProps)(Home)
