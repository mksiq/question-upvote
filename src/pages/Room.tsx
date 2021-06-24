import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room Name</h1>
          <span>3 Questions</span>
        </div>

        <form>
          <textarea placeholder="What question?"></textarea>
          <div className="form-footer">
            <span>
              To ask, <button> log in</button>
            </span>
            <Button type="submit">Ask</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
