import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

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
          <button onClick={handleCreateRoom} className="create-room">
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
