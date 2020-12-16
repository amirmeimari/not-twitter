import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'

const Home = () => {
  return (
    <>
      <Layout>
        <Header title="Home" back />
        <NewTweet />
      </Layout>
    </>
  )
}

export default Home
