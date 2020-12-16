import classes from './NewTweet.module.scss'
import classNames from 'classnames'

import UserAvatar from '../../assets/images/user-avatar.jpg'
import TextField from '../TextField/TextField'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'

const NewTweet = ({ reply }) => {
  return (
    <section
      className={classNames(classes.tweet, {
        [classes['tweet--reply']]: reply,
      })}
    >
      <figure className={classes.figure}>
        <img className={classes.avatar} src={UserAvatar} alt="amir meimari" />
      </figure>

      <TextField placeholder={reply ? 'Tweet your reply' : 'What\'s Happening?'} />

      <Divider className={classes.divider} />

      <Button className={classes.button}>{reply ? 'Reply' : 'Tweet'}</Button>
    </section>
  )
}

export default NewTweet
