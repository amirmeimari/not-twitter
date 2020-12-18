import classes from './Tweet.module.scss'
import classNames from 'classnames'
import { connect } from 'react-redux'
import moment from 'moment'
import { addReaction } from '../../store/index'

import Divider from '../Divider/Divider'
import ReactionPopup from '../ReactionPopup/ReactionPopup'
import DropDownMenu from '../DropDownMenu/DropDownMenu'

import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg'
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as AngryEmoji } from '../../assets/icons/dont-mess-with-me-emoji.svg'
import { ReactComponent as CrazyEmoji } from '../../assets/icons/i-am-crazy-emoji.svg'
import { ReactComponent as HeartEmoji } from '../../assets/icons/heart-full.svg'
import { ReactComponent as LaughEmoji } from '../../assets/icons/laugh-emoji.svg'
import { ReactComponent as NotHappyEmoji } from '../../assets/icons/not-happy-emoji.svg'
import { ReactComponent as ThumbsUpEmoji } from '../../assets/icons/thumbs-up-emoji.svg'
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg'
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg'
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg'

const Tweet = ({
  reply,
  comment,
  onCommentClicked,
  content,
  dispatch,
  onClick,
}) => {
  const handleUpdateSelected = (emojiId) => {
    dispatch(addReaction(emojiId, content.tweet_id))
  }

  const renderedReaction = () => {
    switch (content.reaction) {
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

  const shareOnSocial = () => {
    console.log('Haha how funny to share a tweet in not twitter on twitter!')
    window.open(
      `https://twitter.com/intent/tweet?text=${content.body} - Via Not Twitter 😃`,
    )
  }

  const shareItems = [
    {
      text: 'Share this post',
      icon: LinkIcon,
      action: shareOnSocial,
    },
    {
      text: 'Bookmark',
      icon: BookmarkIcon,
      action: null,
    },
    {
      text: 'Send to a friend',
      icon: MessageIcon,
      action: null,
    },
  ]

  const actionsElement = (
    <nav className={classes['actions-container']}>
      <ul className={classes.actions}>
        <li className={classNames(classes.action, 'comment-action')} onClick={onCommentClicked}>
          <CommentIcon className={classes['action-icon']} />
        </li>
        <ReactionPopup handleUpdateSelected={(v) => handleUpdateSelected(v)}>
          <li className={classNames(classes.action, 'reaction-action')}>{renderedReaction()}</li>
        </ReactionPopup>
        <DropDownMenu items={shareItems}>
          <li className={classNames(classes.action, 'share-action')}>
            <ShareIcon className={classes['action-icon']} />
          </li>
        </DropDownMenu>
      </ul>
    </nav>
  )

  return (
    <section
      onClick={onClick}
      className={classNames(classes.tweet, {
        [classes['tweet--reply']]: reply,
        [classes['tweet--comment']]: comment,
      })}
    >
      <figure className={classes.figure}>
        <img
          className={classes.avatar}
          src={
            content.avatar
              ? require(`../../assets/images/${content.avatar}`).default
              : null
          }
          alt={content.name}
        />
      </figure>

      {reply ? <div className={classes['reply-connector']} /> : null}

      <div className={classes['tweet-info']}>
        <div className={classes['author-info']}>
          <span className={classes.name}>{content.name}</span>
          <span className={classes.id}>@{content.username}</span>
        </div>

        <div className={classes['details-info']}>
          {comment ? (
            <span className={classes['reply-to']}>
              Replying to @{content.replyTo}
            </span>
          ) : null}
          <span className={classes.date}>{moment(content.date).fromNow()}</span>
        </div>
      </div>

      <p className={classes.body}>{content.body}</p>

      {comment ? null : <Divider className={classes.divider} />}

      {reply || comment ? null : actionsElement}
    </section>
  )
}

export default connect()(Tweet)
