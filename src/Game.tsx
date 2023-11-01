import { Card, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/gradient-dark';
import { type Question as QuestionType } from './types';

type QuestionProp = {
  info: QuestionType;
};

const Question: React.FC<QuestionProp> = ({ info }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        textAlign: 'left',
        padding: 2,
        bgcolor: '#222',
      }}>
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter language='javascript' style={SyntaxTheme}>
        {info.code}
      </SyntaxHighlighter>
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
