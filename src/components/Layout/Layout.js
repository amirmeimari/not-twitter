import classes from './Layout.module.scss'
import classNames from 'classnames'

const Layout = ({ children, className }) => {
  return <main className={classNames(classes.Layout, className)}>{children}</main>
}

export default Layout
