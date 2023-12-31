import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQuestionsStore } from './store/questions';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/gradient-dark';
import { type Question as QuestionType } from './types';
import Footer from './Footer';

type QuestionProp = {
  info: QuestionType;
};

const Question: React.FC<QuestionProp> = ({ info }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  const getBackgroundColor = (answerIndex: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    if (userSelectedAnswer == null) return 'transparent';
    if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer)
      return 'transparent';
    if (userSelectedAnswer !== null) {
      if (answerIndex === correctAnswer) return 'green';
      if (answerIndex === userSelectedAnswer) return 'red';
    }
  };
  return (
    <Card
      variant='outlined'
      sx={{
        textAlign: 'left',
        padding: 2,
        bgcolor: '#222',
        marginTop: 4,
      }}>
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter
        language='javascript'
        style={SyntaxTheme}
        wrapLines={true}
        wrapLongLines={true}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != undefined}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(index),
              }}>
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems={'center'}
        justifyContent={'center'}>
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}>
          {'<'}
        </IconButton>
        <Typography variant='h5' component='h2'>
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}>
          {'>'}
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
export default Game;
