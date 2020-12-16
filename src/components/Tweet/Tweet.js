import classes from './Tweet.module.scss'

import UserAvatar from '../../assets/images/user-avatar.jpg'

import Divider from '../Divider/Divider'

import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg'
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'

const Tweet = () => {
  return (
    <section className={classes.tweet}>
      <figure className={classes.figure}>
        <img className={classes.avatar} src={UserAvatar} alt="amir meimari" />
      </figure>

      <div className={classes['tweet-info']}>
        <div className={classes['author-info']}>
          <span className={classes.name}>Amir Meimari 🦊</span>
          <span className={classes.id}>@amir</span>
        </div>
        <span className={classes.date}>2 days ago</span>
      </div>

      <p className={classes.body}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
        doloribus animi eaque quos unde molestias veritatis tempore, nisi
        quisquam, esse id quibusdam aliquid. Possimus nobis illum error
        excepturi eaque numquam. Tenetur cum recusandae, reprehenderit quisquam
        debitis, velit vitae minus aliquam quo, earum beatae nulla
      </p>

      <Divider className={classes.divider} />

      <nav className={classes['actions-container']}>
        <ul className={classes.actions}>
          <li className={classes.action}>
            <CommentIcon className={classes['action-icon']} />
          </li>
          <li className={classes.action}>
            <HeartIcon className={classes['action-icon']} />
          </li>
          <li className={classes.action}>
            <ShareIcon className={classes['action-icon']} />
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Tweet
