import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
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
          <button className="create-room">
            <img src={googleIconImg} alt="" />
            Create your room with Google
          </button>
          <div className="separator">Enter a room</div>
          <form>
            <input type="text" placeholder="Enter the room code" />
            <br />
            <Button type="submit">Join</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
