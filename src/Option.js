export default ({ option, optionLabelPath, optionComponent, select }) => {
  debugger
  let OptionComponent = optionComponent

  if (OptionComponent) {
    return <OptionComponent option={option} select={select} />
  }

  if (typeof option === 'object') {
    if (optionLabelPath) {
      return <span>{option[optionLabelPath]}</span>
    }
  }

  if (typeof option === 'string') {
    return <span>{option}</span>
  }

  return null
}
