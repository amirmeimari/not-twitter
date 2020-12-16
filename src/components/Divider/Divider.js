import classNames from 'classnames'
import classes from './Divider.module.scss'

const Divider = ({ big, className }) => {
  return (
    <div
      className={classNames(classes.divider, className, { [classes.big]: big })}
    ></div>
  )
}

export default Divider
