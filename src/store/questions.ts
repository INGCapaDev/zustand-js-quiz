import { type Question } from '../types';
import { create } from 'zustand';
import confetti from 'canvas-confetti';

type State = {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionID: number, answerIndex: number) => void;
};

const initialState: Omit<State, 'fetchQuestions' | 'selectAnswer'> = {
  questions: [],
  currentQuestion: 0,
};

export const useQuestionsStore = create<State>((set, get) => {
  return {
    ...initialState,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json');
      const json = await res.json();
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionID: number, answerIndex: number) => {
      // use StructureClone to avoid mutating the state
      const { questions } = get();
      const newQuestions = structuredClone(questions);

      // find the question and check if the answer is correct
      const questionIndex = newQuestions.findIndex(
        (question) => question.id === questionID
      );
      const questionInfo = newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

      if (isCorrectUserAnswer) {
        confetti();
      }

      // update the state
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };

      set({ questions: newQuestions });
    },
  };
});
