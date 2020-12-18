import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = () => {
  const history = useHistory()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleToggleModalComment = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen)
  }

  return (
    <>
      <Layout>
        <Header onActionClicked={() => history.push('/')} title="Tweet" back />
        <Tweet onCommentClicked={() => handleToggleModalComment()} />
        <Divider big />
        <Tweet comment />
        <Tweet comment />

        <Modal
          onCloseClicked={() => handleToggleModalComment()}
          active={isModalOpen}
          title="Reply"
        >
          <Tweet reply />
          <NewTweet reply />
        </Modal>
      </Layout>
    </>
  )
}

export default Home
