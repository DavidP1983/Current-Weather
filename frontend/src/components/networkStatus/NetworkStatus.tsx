import './networkStatus.scss';

interface NetworkStatusProps {
  clazz: string;
  isOnline: boolean;
  text: string;
}

export const NetworkStatus = ({
  clazz,
  isOnline,
  text,
}: NetworkStatusProps) => {
  const classNames = isOnline
    ? `popup ${clazz} online`
    : `popup ${clazz} offline`;
  return (
    <>
      <div
        className={classNames}
        id="popup">
        {text}
      </div>
    </>
  );
};
