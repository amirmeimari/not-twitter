import classes from './Header.module.scss'

import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg'

const Header = ({ title, back }) => {
  return (
    <header className={classes.header}>
      {back ? (
        <button className={classes['back-btn']}>
          <BackIcon className={classes.icon} />
        </button>
      ) : null}
      <h1 className={classes.title}>{title}</h1>
    </header>
  )
}

export default Header
