import { useState, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import classes from './NewTweet.module.scss'
import classNames from 'classnames'

import TextField from '../TextField/TextField'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'

const NewTweet = forwardRef((props, ref) => {
  const { register, handleSubmit, errors } = useForm()
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    cleanUp() {
      setValue('')
    },
  }))

  const handleInputChange = (e) => {
    setValue(e.target.value)
    props.text(e.target.value)
  }

  return (
    <section
      className={classNames(classes.tweet, {
        [classes['tweet--reply']]: props.reply,
      })}
    >
      <figure className={classes.figure}>
        <img
          className={classes.avatar}
          src={
            props.avatar
              ? require(`../../assets/images/${props.avatar}`).default
              : null
          }
          alt="amir meimari"
        />
      </figure>

      <TextField
        register={register({ required: true, minLength: 5 })}
        name="newTweetTextarea"
        onChange={handleInputChange}
        value={value}
        disabled={props.loading}
        placeholder={props.reply ? 'Tweet your reply' : "What's Happening?"}
      />
      <span className={classes['error-message']}>
        {errors.newTweetTextarea && 'Please enter at least 5 characters'}
      </span>

      <Divider className={classes.divider} />

      <Button
        loading={props.loading}
        disabled={errors.newTweetTextarea}
        className={classes.button}
        onClick={handleSubmit(props.onSubmit)}
      >
        {props.reply ? 'Reply' : 'Tweet'}
      </Button>
    </section>
  )
})

export default NewTweet
