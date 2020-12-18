import { useRef, useState } from 'react'

import classes from './ReactionPopup.module.scss'
import '../../assets/styles/base/_transitions.scss'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { ReactComponent as AngryEmoji } from '../../assets/icons/dont-mess-with-me-emoji.svg'
import { ReactComponent as CrazyEmoji } from '../../assets/icons/i-am-crazy-emoji.svg'
import { ReactComponent as HeartEmoji } from '../../assets/icons/heart-full.svg'
import { ReactComponent as LaughEmoji } from '../../assets/icons/laugh-emoji.svg'
import { ReactComponent as NotHappyEmoji } from '../../assets/icons/not-happy-emoji.svg'
import { ReactComponent as ThumbsUpEmoji } from '../../assets/icons/thumbs-up-emoji.svg'

/*
  emoji values:
  LaughEmoji: 0
  HeartEmoji: 1
  AngryEmoji: 2
  CrazyEmoji: 3
  NotHappyEmoji: 4
  ThumbsUpEmoji: 5
*/
const EMOJIES = [
  {
    emoji: LaughEmoji,
    id: 0,
  },
  {
    emoji: HeartEmoji,
    id: 1,
  },
  {
    emoji: AngryEmoji,
    id: 2,
  },
  {
    emoji: CrazyEmoji,
    id: 3,
  },
  {
    emoji: NotHappyEmoji,
    id: 4,
  },
  {
    emoji: ThumbsUpEmoji,
    id: 5,
  },
]

const ReactionPopup = ({ children, handleUpdateSelected }) => {
  const [shellAxis, setShellAxis] = useState({ top: 0, left: 0 })
  const [isShellShown, setIsShellShown] = useState(false)
  const [hideTimeout, setHideTimeout] = useState(null)
  const [selectedEmoji, setSelectedEmoji] = useState(0)

  const reactionShell = useRef(null)

  const handleShowReactions = (e) => {
    // check for hover on a right element
    const target = e.target.closest(`.${classes['target-element']}`)
    if (target) {
      setHideTimeout(clearTimeout(hideTimeout))

      const targetClientRect = target.getBoundingClientRect()
      const shellClientRect = reactionShell.current.getBoundingClientRect()
      const spaceY = 25
      const spaceX = 10

      let top = 0
      let left = 0

      // check if shell should open in bottom or top of the element
      if (shellClientRect.height + spaceY < targetClientRect.y) {
        // should open in top
        // calc shell top position
        top =
          targetClientRect.y + window.scrollY - targetClientRect.height - spaceY
      } else {
        // should open in bottom
        // calc shell top position
        top =
          targetClientRect.y +
          window.scrollY +
          targetClientRect.height +
          spaceY / 4
      }
      left = targetClientRect.x - spaceX

      // update shell position
      setShellAxis({ top, left })
      setIsShellShown(true)
    }
  }

  const handleHiddenReactions = () => {
    if (isShellShown) {
      setIsShellShown(false)
    }
  }

  const handleAttemptToHide = () => {
    setHideTimeout(
      setTimeout(() => {
        handleHiddenReactions()
      }, 1000),
    )
  }

  const handleUpdateSelectedEmoji = (val) => {
    setSelectedEmoji(val)
    // update parent
    handleUpdateSelected(val)
  }

  const renderedEmojies = EMOJIES.map((emoji) => {
    return (
      <li
        key={emoji.id}
        className={classNames(classes.reaction, {
          [classes['reaction--active']]: selectedEmoji === emoji.id,
        })}
      >
        <emoji.emoji
          onClick={() => handleUpdateSelectedEmoji(emoji.id)}
          className={classNames(classes.emoji)}
        />
      </li>
    )
  })

  return (
    <div className={classNames(classes.container)}>
      <div
        className={classes['target-element']}
        onMouseEnter={(e) => handleShowReactions(e)}
        onMouseLeave={() => handleAttemptToHide()}
      >
        {children}
      </div>

      <CSSTransition
        nodeRef={reactionShell}
        in={isShellShown}
        timeout={300}
        classNames="reactions"
      >
        <nav
          className={classNames(classes.shell)}
          ref={reactionShell}
          style={{ top: shellAxis.top, left: shellAxis.left }}
          onMouseEnter={() => setHideTimeout(clearTimeout(hideTimeout))}
          onMouseLeave={() => handleAttemptToHide()}
        >
          <ul className={classNames(classes.reactions)}>{renderedEmojies}</ul>
        </nav>
      </CSSTransition>
    </div>
  )
}

export default ReactionPopup
