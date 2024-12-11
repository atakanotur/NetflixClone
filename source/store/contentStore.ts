import { create } from "zustand";
import contents from "../data/content";
import recommendedContents from "../data/recommendedContents";

type State = {
  contents: Content[];
  recommendedContents: Content[];
};

type Action = {
  setContents: (contents: State["contents"]) => void;
};

const contentStore = create<State & Action>()((set) => ({
  contents,
  recommendedContents,
  setContents: (contents) => set(() => ({ contents })),
}));

export default contentStore;
