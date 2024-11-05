import { create } from "zustand";
import newAndPopularCategories from "../data/newAndPopularCategories";

type State = {
  newAndPopularCategories: Category[];
};

type Action = {
  setNewAndPopularCategories: (
    categories: State["newAndPopularCategories"]
  ) => void;
};

const newAndPopularCategoryStore = create<State & Action>()((set) => ({
  newAndPopularCategories,
  setNewAndPopularCategories: (newAndPopularCategories) =>
    set(() => ({ newAndPopularCategories })),
}));

export default newAndPopularCategoryStore;
