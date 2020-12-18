import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addNewTweet, addComment } from '../store/index'

import nanoid from 'nanoid'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

  const [newTweetText, setNewTweetText] = useState('')
  const [commentTweetText, setCommentTweetText] = useState('')
  const [loadingNewTweet, setLoadingNewTweet] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetTweetToComment, setTargetTweetToComment] = useState(null)

  useEffect(() => {
    // watch for changes in targetTweet
    setIsModalOpen(targetTweetToComment !== null)

    return () => {}
  }, [targetTweetToComment])

  const handleOpenModalComment = (tweet) => {
    // find and set target value
    setTargetTweetToComment(tweet)
  }

  const handleCloseModalComment = () => {
    setIsModalOpen(false)
    setTargetTweetToComment(null)
  }

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
        user_id: loggedUser.user_id,
        tweet_owner_id: loggedUser.user_id,
        date: Date.now(),
        body: data.body,
        parent_tweet_id: targetTweetToComment.tweet_id,
      }

      dispatch(addComment(newComment, targetTweetToComment.tweet_id))
      // close modal
      handleCloseModalComment()
      // clean up on NewTweet component
      commentTweetRef.current.cleanUp()
    } catch (e) {
      console.log(`An error occurred white submitting new comment`, e)
    }
    setLoadingNewTweet(false)
  }

  const handleRedirectToDetails = (e, ti) => {
    const commentAction = e.target.closest('.comment-action')
    const reactionContainer = e.target.closest('.reaction-container')
    const reactionAction = e.target.closest('.reaction-action')
    const shareAction = e.target.closest('.share-action')
    const dropdownContainer = e.target.closest('.dropdown-container')
    if (
      !commentAction &&
      !reactionAction &&
      !shareAction &&
      !reactionContainer &&
      !dropdownContainer
    ) {
      history.push(`/tweet/${ti}`)
    }
  }

  const renderTweets = tweets.map((tweet) => {
    // get user info
    const user = users.find((user) => user.user_id === tweet.tweet_owner_id)
    return (
      <Tweet
        onClick={(e) => handleRedirectToDetails(e, tweet.tweet_id)}
        key={tweet.tweet_id}
        content={{ ...tweet, ...user }}
        onCommentClicked={() => handleOpenModalComment({ ...tweet, ...user })}
      />
    )
  })

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
