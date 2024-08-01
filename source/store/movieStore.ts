import { create } from "zustand";

type State = {
  movies: Movie[];
};

type Action = {
  setMovies: (movies: State["movies"]) => void;
};

const movieStore = create<State & Action>()((set) => ({
  movies: [],
  setMovies: (movies) => set(() => ({ movies })),
}));

export default movieStore;