import { create } from "zustand";
import contents from "../data/content";

type State = {
  contents: (Series | Movie)[];
};

type Action = {
  setContents: (contents: State["contents"]) => void;
};

const contentStore = create<State & Action>()((set) => ({
  contents,
  setContents: (contents) => set(() => ({ contents })),
}));

export default contentStore;
