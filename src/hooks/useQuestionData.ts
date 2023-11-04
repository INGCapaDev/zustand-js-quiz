import { useQuestionsStore } from '../store/questions';

export const useQuestionData = () => {
  const questions = useQuestionsStore((state) => state.questions);
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) return unanswered++;
    if (question.userSelectedAnswer === question.correctAnswer)
      return correct++;
    return incorrect++;
  });

  return {
    correct,
    incorrect,
    unanswered,
  };
};
