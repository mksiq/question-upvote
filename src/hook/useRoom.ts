import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { QuestionsRecord, QuestionType } from '../types';

export function useRoom(roomId: string) {
  const [roomName, setRoomName] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once('value', (room: any) => {
      const fbQuestions: QuestionsRecord = room.val().questions;
      console.log(fbQuestions);
      if (fbQuestions) {
        const parsedQuestions = Object.entries(fbQuestions).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        });

        setQuestions(parsedQuestions);
      } else {
        setQuestions([]);
      }

      setRoomName(room.val().title);
    });
  }, [roomId]);

  return { questions, roomName };
}
