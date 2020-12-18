import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = () => {
  return (
    <>
      <Layout>
        <Header title="Tweet" back />
        <Tweet />
        <Divider big />
        <Tweet comment />
        <Tweet comment />


        <Modal title="Reply">
          <Tweet reply />
          <NewTweet reply />
        </Modal>
      </Layout>
    </>
  )
}

export default Home
