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
    profiles: [
      {
        id: "0",
        name: "Profile 1",
        imageUrl:
          "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
        locked: true,
        password: "1234",
        myList: [],
      },
      {
        id: "1",
        name: "Profile 2",
        imageUrl:
          "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
        locked: true,
        password: "1234",
        myList: [],
      },
      {
        id: "2",
        name: "Profile 3",
        imageUrl:
          "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
        locked: true,
        password: "1234",
        myList: [],
      },
      {
        id: "3",
        name: "Profile 4",
        imageUrl:
          "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
        locked: false,
        myList: [],
      },
      {
        id: "4",
        name: "Profile 5",
        imageUrl:
          "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
        locked: false,
        myList: [],
      },
    ],
    password: "12345678",
  },
  setUser: (user) => set(() => ({ user: user })),
}));

export default userStore;
