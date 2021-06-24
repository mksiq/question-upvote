import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [room, setRoom] = useState('');
  const [error, setError] = useState(false);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();
    if (room.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${room}`).get();

    if (!roomRef.exists()) {
      setError(true);
      return;
    }
    setError(false);

    history.push(`/rooms/${room}`);
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Enter the room code"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
            />
            <br />
            <Button type="submit">Join</Button>
            {error ? <div className="error-message">Room does not exist. 😞</div> : <></>}
          </form>
        </div>
      </main>
    </div>
  );
}
