import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import NewTweet from '../components/NewTweet/NewTweet'
import Divider from '../components/Divider/Divider'
import Tweet from '../components/Tweet/Tweet'
import Modal from '../components/Modal/Modal'

const Home = () => {
  const tweet = {
    id: 1,
    name: 'amir',
    username: 'amirmeimari',
    avatar: 'test.png',
    date: '2 days ago',
    body: 'test body',
  }

  const handleSetNewTweetText = (v) => {
    console.log(v);
  }

  const handleSubmitNewTweet = () => {
    console.log('wdawd');
  }

  return (
    <>
      <Layout>
        <Header title="Home" />
        <NewTweet text={handleSetNewTweetText} onSubmit={() => handleSubmitNewTweet()} />
        <Divider big />
        <Tweet content={tweet}  />

        <Modal title="Reply">
          <Tweet reply />
          <NewTweet reply />
        </Modal>
      </Layout>
    </>
  )
}

export default Home
