import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import asnwerImg from '../../assets/images/answer.svg';
import './styles.scss';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
// import { useAuth } from '../../hook/useAuth';
import { Question } from '../../components/Question';
import { useRoom } from '../../hook/useRoom';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  // const { user } = useAuth();

  async function handleEndRoom(roomId: string) {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDelete(questionId: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheck(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlight(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  const { questions, title } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={() => handleEndRoom(roomId)}>
              End Room
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room Name: {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
            </span>
          )}
        </div>

        <div className="question-list">
          {questions.map((question, index) => {
            return (
              <Question
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                key={index}
              >
                <button type="button" onClick={() => handleCheck(question.id)}>
                  <img src={checkImg} alt="Check as answered" />
                </button>
                <button type="button" onClick={() => handleHighlight(question.id)}>
                  <img src={asnwerImg} alt="Highlight Question" />
                </button>
                <button type="button" onClick={() => handleDelete(question.id)}>
                  <img src={deleteImg} alt="Delete Question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
