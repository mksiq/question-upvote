import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Link, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hook/useRoom';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, roomName } = useRoom(roomId);

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
          <h1>Room Name: {roomName}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}ß
            </span>
          )}
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
                To ask,{' '}
                <Link to="/">
                  <button> log in</button>
                </Link>
              </span>
            )}

            <Button disabled={!user} type="submit">
              Ask
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question, index) => {
            return <Question content={question.content} author={question.author} key={index} />;
          })}
        </div>
      </main>
    </div>
  );
}
