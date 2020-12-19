import { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import nanoid from 'nanoid'

import { getTweet, addComment } from '../store/index'

import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = ({ dispatch, tweets, loggedUser }) => {
  const BASE_URL = process.env.REACT_APP_BASE_API_ADDRESS
  const history = useHistory()
  const { id } = useParams()
  const cancelFetchTweet = axios.CancelToken.source()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tweetDetails, setTweetDetails] = useState(null)
  const [commentTweetText, setCommentTweetText] = useState('')
  const [loadingNewTweet, setLoadingNewTweet] = useState(false)

  useEffect(() => {
    // get details from fake server
    if (tweets.length > 0) {
      fetchTweet()
    }

    return () => {
      cancelFetchTweet.cancel()
    }
  }, [tweets])

  const fetchTweet = async () => {
    try {
      // fake fetch request
      await axios.get(`${BASE_URL}/users/`, {
        CancelToken: cancelFetchTweet.token,
      })
      // update users list with local data
      // get user info

      const detailTweet = getTweet(id)
      setTweetDetails({ ...detailTweet })
    } catch (e) {
      console.log(`An error occurred white fetching users list`, e)
    }
  }

  const handleToggleModalComment = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen)
  }

  const handleSetCommentTweetText = (v) => {
    setCommentTweetText(v)
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
        tweet_owner_name: loggedUser.name,
        tweet_owner_avatar: loggedUser.avatar,
        tweet_owner_username: loggedUser.username,
        date: Date.now(),
        body: data.body,
        parent_tweet_id: tweetDetails.tweet_id,
      }

      dispatch(addComment(newComment, tweetDetails.tweet_id))
      // close modal
      handleToggleModalComment()
    } catch (e) {
      console.log(`An error occurred white submitting new comment`, e)
    }
    setLoadingNewTweet(false)
  }

  const renderComments = tweetDetails?.comments.map((comment) => {
    return <Tweet content={comment} key={comment.tweet_id} comment />
  })

  return (
    <>
      <Layout>
        <Header onActionClicked={() => history.push('/')} title="Tweet" back />
        <Tweet
          content={tweetDetails ? tweetDetails : {}}
          onCommentClicked={() => handleToggleModalComment()}
        />
        <Divider big />

        {renderComments}

        <Modal
          onCloseClicked={() => handleToggleModalComment()}
          active={isModalOpen}
          title="Reply"
        >
          <Tweet reply content={tweetDetails} />
          <NewTweet
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

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    loggedUser: state.loggedUser,
  }
}

export default connect(mapStateToProps)(Home)
