import classes from './TextField.module.scss'
import TextareaAutosize from 'react-textarea-autosize'

const TextField = ({ placeholder, value, onChange, disabled }) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={onChange}
      disabled={disabled}
      minRows="3"
      placeholder={placeholder}
      className={classes['text-field']}
    />
  )
}

export default TextField
