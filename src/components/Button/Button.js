import classes from './Button.module.scss'
import classNames from 'classnames'

import { ReactComponent as LoadingIcon } from '../../assets/icons/loading.svg'

const Button = ({ children, className, disabled, loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(classes.button, className, {
        [classes.disabled]: disabled,
        [classes.loading]: loading,
      })}
    >
      {loading ? <LoadingIcon className={classes['loading-icon']} /> : children}
    </button>
  )
}

export default Button
