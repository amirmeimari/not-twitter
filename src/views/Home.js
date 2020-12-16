import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'

const Home = () => {
  return (
    <>
      <Layout>
        <Header title="Home" />
        <NewTweet />
        <Divider big />
        <Tweet />
      </Layout>
    </>
  )
}

export default Home
