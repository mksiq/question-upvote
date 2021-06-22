import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="" />
        <strong>Create rooms for live Q&amp;A </strong>
        <p>Share information with your peers in real-time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="" />
          <h2>Create new Room</h2>
          <form>
            <input type="text" placeholder="Room name" />
            <br />
            <Button type="submit">Create Room</Button>
          </form>
          <p>
            Want to enter an existing Room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
