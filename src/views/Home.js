import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  updateUsersList,
  updateLoggedUser,
  updateTweetsList,
  addNewTweet,
  addComment,
} from '../store/index'

import nanoid from 'nanoid'

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
  const newTweetRef = useRef()
  const commentTweetRef = useRef()

  const [newTweetText, setNewTweetText] = useState('')
  const [commentTweetText, setCommentTweetText] = useState('')
  const [loadingNewTweet, setLoadingNewTweet] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetTweetToComment, setTargetTweetToComment] = useState(null)

  useEffect(() => {
    // fetch users list from API
    fetchUsersList()
    handleUpdateLoggedUser()
    fetchTweets()
  }, [])

  useEffect(() => {
    // watch for changes in targetTweet
    setIsModalOpen(targetTweetToComment !== null)
  }, [targetTweetToComment])

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

  const handleOpenModalComment = (tweet) => {
    // find and set target value
    setTargetTweetToComment(tweet)
  }

  const handleCloseModalComment = () => {
    setIsModalOpen(false)
    setTargetTweetToComment(null)
  }

  const renderTweets = tweets.map((tweet) => {
    // get user info
    const user = users.find((user) => user.user_id === tweet.tweet_owner_id)
    return (
      <Tweet
        key={tweet.tweet_id}
        content={{ ...tweet, ...user }}
        onCommentClicked={() => handleOpenModalComment({ ...tweet, ...user })}
      />
    )
  })

  const handleSetNewTweetText = (v) => {
    setNewTweetText(v)
  }

  const handleSetCommentTweetText = (v) => {
    setCommentTweetText(v)
  }

  const handleSubmitNewTweet = async () => {
    setLoadingNewTweet(true)
    try {
      // fake server request
      const { data } = await axios.post(`${BASE_URL}/posts`, {
        title: 'new tweet',
        body: newTweetText,
      })

      const newTweet = {
        tweet_id: nanoid(),
        tweet_owner_id: loggedUser.user_id,
        date: Date.now(),
        body: data.body,
        reaction: null,
        comments: [],
      }

      dispatch(addNewTweet(newTweet))
      // clean up on NewTweet component
      newTweetRef.current.cleanUp()
      // push tweet into state and local storage
    } catch (e) {
      console.log(`An error occurred white sending new tweet`, e)
    }
    setLoadingNewTweet(false)
  }

  const handleSubmitNewComment = async () => {
    setLoadingNewTweet(true)
    try {
      // fake server request
      const { data } = await axios.post(`${BASE_URL}/posts`, {
        title: 'new tweet',
        body: commentTweetText,
      })

      const newComment = {
        tweet_id: nanoid(),
        tweet_owner_id: loggedUser.user_id,
        date: Date.now(),
        body: data.body,
        parent_tweet_id: targetTweetToComment.tweet_id
      }

      dispatch(addComment(newComment, targetTweetToComment.tweet_id))
      // close modal
      handleCloseModalComment()
      // clean up on NewTweet component
      commentTweetRef.current.cleanUp()
      // push tweet into state and local storage
    } catch (e) {
      console.log(`An error occurred white submitting new comment`, e)
    }
    setLoadingNewTweet(false)
  }

  return (
    <>
      <Layout>
        <Header title="Home" />
        <NewTweet
          ref={newTweetRef}
          text={handleSetNewTweetText}
          onSubmit={() => handleSubmitNewTweet()}
          avatar={loggedUser.avatar}
          loading={loadingNewTweet}
        />
        <Divider big />

        {renderTweets}

        <Modal
          onCloseClicked={() => handleCloseModalComment()}
          active={isModalOpen}
          title="Reply"
        >
          <Tweet reply content={targetTweetToComment} />
          <NewTweet
            ref={commentTweetRef}
            text={handleSetCommentTweetText}
            onSubmit={() => handleSubmitNewComment()}
            loading={loadingNewTweet}
            avatar={loggedUser.avatar}
            reply
          />
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
