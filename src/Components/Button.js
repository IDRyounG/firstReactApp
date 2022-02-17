import PropTypes from "prop-types"

const Button = ({color, text, onToggle}) => {
  return (
    <button onClick={onToggle} style={{backgroundColor: color}}className="btn">{text}</button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text : PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button