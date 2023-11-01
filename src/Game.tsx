import { Card, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import { type Question as QuestionType } from './types';

type QuestionProp = {
  info: QuestionType;
};

const Question: React.FC<QuestionProp> = ({ info }) => {
  return (
    <Card variant='outlined'>
      <Typography variant='h5'>{info.question}</Typography>
    </Card>
  );
};

const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};
export default Game;
