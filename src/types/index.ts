export type QuestionType = {
  id?: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: string;
  isHighlighted: string;
};

export type QuestionsRecord = Record<string, QuestionType>;
