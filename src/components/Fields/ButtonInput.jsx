export const ButtonInput = ({ type, label, onClick, onSubmit, ...rest }) => {
  return (
    <button type={type} onClick={onClick} onSubmit={onSubmit} {...rest}>
      {label}
    </button>
  );
};
