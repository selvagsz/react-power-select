export default (props) => (
  <div
    className={`option ${props.isHighlighted ? 'highlighted' : ''}`}
    onClick={props.onOptionClick}
  >
    {
      props.optionComponent ?
      props.optionComponent({
        option: props.option,
        select: props.select
      }) :
      props.option
    }
  </div>
)
