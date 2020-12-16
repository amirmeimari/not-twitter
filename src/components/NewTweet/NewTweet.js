import classes from './NewTweet.module.scss'

import UserAvatar from '../../assets/images/user-avatar.jpg'
import TextField from '../TextField/TextField'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'

const NewTweet = () => {
  return (
    <section className={classes.container}>
      <figure className={classes.figure}>
        <img className={classes.avatar} src={UserAvatar} alt="amir meimari" />
      </figure>

      <TextField placeholder="What's Happening?" />

      <Divider className={classes.divider} />

      <Button className={classes.button}>Tweet</Button>
    </section>
  )
}

export default NewTweet
