import { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUsersList, updateLoggedUser } from '../store/index'

// local data
import usersList from '../data/users.json'

import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = ({ dispatch }) => {
  const BASE_URL = process.env.REACT_APP_BASE_API_ADDRESS

  useEffect(() => {
    // fetch users list from API
    fetchUsersList()
    handleUpdateLoggedUser()
  }, [])

  const fetchUsersList = async () => {
    // fake fetch request
    await axios.get(`${BASE_URL}/users/`)
    // update users list with local data
    dispatch(updateUsersList(usersList))
    try {
    } catch (e) {
      console.log(`An error occurred white fetching users list`, e)
    }
  }

  const handleUpdateLoggedUser = () => {
    // in real cases logged user should be fetch and authenticated even before app loaded, for example after login, but here it's not the case so i will not send request, just update local storage and store
    dispatch(updateLoggedUser(usersList[0]))
  }

  const tweet = {
    id: 1,
    name: 'amir',
    username: 'amirmeimari',
    avatar: 'test.png',
    date: '2 days ago',
    body: 'test body',
  }

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
        />
        <Divider big />
        <Tweet content={tweet} />

        <Modal title="Reply">
          <Tweet reply />
          <NewTweet reply />
        </Modal>
      </Layout>
    </>
  )
}

const mapStateToPros = (state) => {
  return {
    tweets: state.tweets,
  }
}

export default connect(mapStateToPros)(Home)
