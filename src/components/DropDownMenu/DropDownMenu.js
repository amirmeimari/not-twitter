import { useRef, useState } from 'react'

import classes from './DropDownMenu.module.scss'
import '../../assets/styles/base/_transitions.scss'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

const DropDownMenu = ({ children, items }) => {
  const [shellAxis, setShellAxis] = useState({ top: 0, left: 0 })
  const [isShellShown, setIsShellShown] = useState(false)
  const [hideTimeout, setHideTimeout] = useState(null)

  const itemsShell = useRef(null)

  const handleShowItems = (e) => {
    // check for hover on a right element
    const target = e.target.closest(`.${classes['target-element']}`)
    if (target) {
      setHideTimeout(clearTimeout(hideTimeout))

      const targetClientRect = target.getBoundingClientRect()
      const shellClientRect = itemsShell.current.getBoundingClientRect()
      const space = 5

      let top = 0
      let left = 0

      // check if shell should open in bottom or top of the element
      if (
        shellClientRect.height + space + targetClientRect.y <
        window.innerHeight
      ) {
        // should open in bottom
        // calc shell top position
        top =
          targetClientRect.y + window.scrollY + targetClientRect.height + space
      } else {
        // should open in top
        // calc shell top position
        top =
          targetClientRect.y + window.scrollY - shellClientRect.height - space
      }
      left =
        targetClientRect.x +
        targetClientRect.width +
        space -
        shellClientRect.width

      // update shell position
      setShellAxis({ top, left })
      setIsShellShown(true)
    }
  }

  const handleHideItems = () => {
    if (isShellShown) {
      setIsShellShown(false)
    }
  }

  const handleAttemptToHide = () => {
    setHideTimeout(
      setTimeout(() => {
        handleHideItems()
      }, 1000),
    )
  }

  const renderedItems = items.map((item) => {
    return (
      <li
        key={item.text}
        onClick={item.action}
        className={classNames(classes.item)}
      >
        <item.icon className={classNames(classes.icon)} />
        <span className={classes.text}>{item.text}</span>
      </li>
    )
  })

  return (
    <div className={classNames(classes.container, 'dropdown-container')}>
      <div
        className={classes['target-element']}
        onMouseEnter={(e) => handleShowItems(e)}
        onMouseLeave={() => handleAttemptToHide()}
      >
        {children}
      </div>

      <CSSTransition
        nodeRef={itemsShell}
        in={isShellShown}
        timeout={300}
        classNames="dropdown"
      >
        <nav
          className={classNames(classes.shell)}
          ref={itemsShell}
          style={{ top: shellAxis.top, left: shellAxis.left }}
          onMouseEnter={() => setHideTimeout(clearTimeout(hideTimeout))}
          onMouseLeave={() => handleAttemptToHide()}
        >
          <ul className={classNames(classes.items)}>{renderedItems}</ul>
        </nav>
      </CSSTransition>
    </div>
  )
}

export default DropDownMenu
