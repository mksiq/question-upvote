import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();

  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      creatorId: user?.id,
      creationDate: Date.now(),
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Create new Room</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Room name" onChange={(e) => setNewRoom(e.target.value)} value={newRoom} />
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
