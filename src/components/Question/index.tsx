import cx from 'classnames';
import { ReactNode } from 'react';
import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({ content, author, isHighlighted = false, isAnswered = false, children }: QuestionProps) {
  console.log(isAnswered);
  let classnames = cx('question', { answered: isAnswered }, { highlighted: isHighlighted });
  return (
    <div className={classnames}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
