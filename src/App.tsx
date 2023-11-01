import './App.css';
import { Container, Stack, Typography } from '@mui/material';
import JavascriptLogo from './JavascriptLogo';
import Start from './Start';
import { useQuestionsStore } from './store/questions';

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems={'center'}
          justifyContent={'center'}>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 &&
          questions.map((question) => (
            <h2 key={question.id}>{question.question}</h2>
          ))}
      </Container>
    </main>
  );
}

export default App;
