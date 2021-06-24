import copyImage from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room-code" onClick={copyCodeToClipboard}>
      <div>
        <img src={copyImage} alt="Copy Room Code" />
      </div>
      <span>Room #{props.code}</span>
    </button>
  );
}
