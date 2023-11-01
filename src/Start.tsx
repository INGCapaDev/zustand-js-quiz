import { Button } from '@mui/material';
import { useQuestionsStore } from './store/questions';

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(5);
  };

  return (
    <Button variant='contained' color='primary' onClick={handleClick}>
      ¡Empezar!
    </Button>
  );
};
export default Start;
