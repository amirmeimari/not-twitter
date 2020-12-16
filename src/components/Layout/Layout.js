import classes from './Layout.module.scss'

const Layout = ({ children }) => {
  return <main className={classes.Layout}>{children}</main>
}

export default Layout
