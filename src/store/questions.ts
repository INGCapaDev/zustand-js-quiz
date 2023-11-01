import { type Question } from '../types';
import { create } from 'zustand';

type State = {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
};

const initialState: Omit<State, 'fetchQuestions'> = {
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
  };
});
