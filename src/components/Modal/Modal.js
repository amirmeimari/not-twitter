import classes from './Modal.module.scss'

import Layout from '../Layout/Layout'
import Header from '../Header/Header'

const Modal = ({ title, children, active }) => {
  if (active) {
    return (
      <div className={classes.overlay}>
        <Layout className={classes.modal}>
          <Header title={title} close />
          {children}
        </Layout>
      </div>
    )
  } else {
    return null
  }
}

export default Modal
