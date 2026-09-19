import spinner from 'assets/icons/spinner.gif';

export const Spinner = () => {
  return (
    <div className="loading">
      <img
        src={spinner}
        alt=""
      />
      <div>Loading...</div>
    </div>
  );
};
