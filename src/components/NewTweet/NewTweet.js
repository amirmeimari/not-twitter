import { useState } from 'react'

import classes from './NewTweet.module.scss'
import classNames from 'classnames'

import TextField from '../TextField/TextField'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'

const NewTweet = ({ reply, text, onSubmit, avatar }) => {
  const [value, setValue] = useState('')

  const handleInputChange = (e) => {
    setValue(e.target.value)
    text(e.target.value)
  }

  return (
    <section
      className={classNames(classes.tweet, {
        [classes['tweet--reply']]: reply,
      })}
    >
      <figure className={classes.figure}>
        <img
          className={classes.avatar}
          src={avatar ? require(`../../assets/images/${avatar}`).default : null}
          alt="amir meimari"
        />
      </figure>

      <TextField
        onChange={handleInputChange}
        value={value}
        placeholder={reply ? 'Tweet your reply' : "What's Happening?"}
      />

      <Divider className={classes.divider} />

      <Button className={classes.button} onClick={onSubmit}>
        {reply ? 'Reply' : 'Tweet'}
      </Button>
    </section>
  )
}

export default NewTweet
