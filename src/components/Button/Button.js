import classes from './Button.module.scss'
import classNames from 'classnames'

const Button = ({ children, className, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(classes.button, className, {
        [classes.disabled]: disabled,
      })}
    >
      {children}
    </button>
  )
}

export default Button
