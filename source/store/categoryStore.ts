import { create } from "zustand";

type State = {
  categories: Category[];
};

type Action = {
  setCategories: (categories: State["categories"]) => void;
};

const categoryStore = create<State & Action>()((set) => ({
  categories: [],
  setCategories: (categories) => set(() => ({ categories })),
}));

export default categoryStore;
