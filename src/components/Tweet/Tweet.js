import { useState } from 'react'
import classes from './Tweet.module.scss'
import classNames from 'classnames'

import UserAvatar from '../../assets/images/user-avatar.jpg'

import Divider from '../Divider/Divider'
import ReactionPopup from '../ReactionPopup/ReactionPopup'

import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg'
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as AngryEmoji } from '../../assets/icons/dont-mess-with-me-emoji.svg'
import { ReactComponent as CrazyEmoji } from '../../assets/icons/i-am-crazy-emoji.svg'
import { ReactComponent as HeartEmoji } from '../../assets/icons/heart-full.svg'
import { ReactComponent as LaughEmoji } from '../../assets/icons/laugh-emoji.svg'
import { ReactComponent as NotHappyEmoji } from '../../assets/icons/not-happy-emoji.svg'
import { ReactComponent as ThumbsUpEmoji } from '../../assets/icons/thumbs-up-emoji.svg'

const Tweet = ({ reply }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null)

  const handleUpdateSelected = (emojiId) => {
    setSelectedEmoji(emojiId)
  }

  const renderedReaction = () => {
    switch (selectedEmoji) {
      case 0:
        return <LaughEmoji className={classes['action-icon']} />
      case 1:
        return <HeartEmoji className={classes['action-icon']} />
      case 2:
        return <AngryEmoji className={classes['action-icon']} />
      case 3:
        return <CrazyEmoji className={classes['action-icon']} />
      case 4:
        return <NotHappyEmoji className={classes['action-icon']} />
      case 5:
        return <ThumbsUpEmoji className={classes['action-icon']} />

      default:
        return <HeartIcon className={classes['action-icon']} />
    }
  }

  const actionsElement = (
    <nav className={classes['actions-container']}>
      <ul className={classes.actions}>
        <li className={classes.action}>
          <CommentIcon className={classes['action-icon']} />
        </li>
        <ReactionPopup handleUpdateSelected={(v) => handleUpdateSelected(v)}>
          <li className={classes.action}>{renderedReaction()}</li>
        </ReactionPopup>
        <li className={classes.action}>
          <ShareIcon className={classes['action-icon']} />
        </li>
      </ul>
    </nav>
  )

  return (
    <section
      className={classNames(classes.tweet, {
        [classes['tweet--reply']]: reply,
      })}
    >
      <figure className={classes.figure}>
        <img className={classes.avatar} src={UserAvatar} alt="amir meimari" />
      </figure>

      {reply ? <div className={classes['reply-connector']} /> : null}

      <div className={classes['tweet-info']}>
        <div className={classes['author-info']}>
          <span className={classes.name}>Amir Meimari 🦊</span>
          <span className={classes.id}>@amir</span>
        </div>
        <span className={classes.date}>2 days ago</span>
      </div>

      <p className={classes.body}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
        doloribus animi eaque quos unde molestias veritatis tempore, nisi
        quisquam, esse id quibusdam aliquid. Possimus nobis illum error
        excepturi eaque numquam. Tenetur cum recusandae, reprehenderit quisquam
        debitis, velit vitae minus aliquam quo, earum beatae nulla
      </p>

      <Divider className={classes.divider} />

      {reply ? null : actionsElement}
    </section>
  )
}

export default Tweet
