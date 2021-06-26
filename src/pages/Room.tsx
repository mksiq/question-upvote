import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');

  async function handleAskQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') return;

    if (!user) {
      throw new Error('You must be logged in'); // react hot-toast
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

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

        <form onSubmit={handleAskQuestion}>
          <textarea
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="What do you want to ask?"
            value={newQuestion}
          ></textarea>
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To ask, <button> log in</button>
              </span>
            )}

            <Button disabled={!user} type="submit">
              Ask
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
