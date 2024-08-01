import { create } from "zustand";

type Action = {
  setUser: (user: State["user"]) => void;
};

type State = {
  user: User;
};

const userStore = create<State & Action>()((set) => ({
  user: {
    id: "0",
    email: "atakan.otur@hotmail.com",
    phoneNumber: "5373965442",
    profiles: [],
    password: "12345678",
  },
  setUser: (user) => set(() => ({ user: user })),
}));

export default userStore;
