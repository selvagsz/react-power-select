export default ({ option, optionLabelPath, onCloseClick, select }) => {
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
      <span className="powerselectmultiple__selectedOption__label">
        {value}
      </span>
      <span
        className="powerselectmultiple__selectedOption__close"
        onClick={event => {
          event.stopPropagation();
          onCloseClick({ option, select });
        }}
      >
        ×
      </span>
    </li>
  );
};
