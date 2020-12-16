import classes from './Header.module.scss'

import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'

const Header = ({ title, back, close }) => {
  return (
    <header className={classes.header}>
      {back || close ? (
        <button className={classes.btn}>
          {back ? (
            <BackIcon className={classes.icon} />
          ) : (
            <CloseIcon className={classes.icon} />
          )}
        </button>
      ) : null}

      <h1 className={classes.title}>{title}</h1>
    </header>
  )
}

export default Header
