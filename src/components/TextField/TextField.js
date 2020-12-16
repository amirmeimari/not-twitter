import classes from './TextField.module.scss'
import TextareaAutosize from 'react-textarea-autosize'

const TextField = ({ placeholder }) => {
  return (
    <TextareaAutosize
      minRows="3"
      placeholder={placeholder}
      className={classes['text-field']}
    />
  )
}

export default TextField
