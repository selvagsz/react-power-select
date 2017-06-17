export default ({ option, optionLabelPath, select }) => {
  let value = null;

  if (typeof option === 'object') {
    if (optionLabelPath) {
      value = option[optionLabelPath];
    }
  }

  if (typeof option === 'string') {
    value = option;
  }

  return (
    <li className="powerselectmultiple__selectedOption">
      <span>{value}</span>
    </li>
  );
};
