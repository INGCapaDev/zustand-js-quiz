import './App.css';
import { Container, Stack, Typography } from '@mui/material';
import JavascriptLogo from './JavascriptLogo';

function App() {
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
      </Container>
    </main>
  );
}

export default App;