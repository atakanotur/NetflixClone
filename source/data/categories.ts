const categories: Category[] = [
  {
    id: "category1",
    title: "Popular on Netflix",
    contents: [
      {
        id: "serie1",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
      },
      {
        id: "serie2",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
      },
      {
        id: "serie3",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
      },
      {
        id: "serie4",
        poster:
          "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
      },
      {
        id: "serie5",
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
      },
    ],
  },
  {
    id: "category2",
    title: "Trending Now",
    contents: [
      {
        id: "serie1",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
      },
      {
        id: "serie2",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
      },
      {
        id: "serie3",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
      },
      {
        id: "serie4",
        poster:
          "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
      },
      {
        id: "serie5",
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
      },
    ],
  },
  {
    id: "category3",
    title: "Latin American series & TV",
    contents: [
      {
        id: "serie1",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
      },
      {
        id: "serie2",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
      },
      {
        id: "serie3",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
      },
      {
        id: "serie4",
        poster:
          "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
      },
      {
        id: "serie5",
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
      },
    ],
  },
  {
    id: "category4",
    title: "Comedies",
    contents: [
      {
        id: "serie1",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
      },
      {
        id: "serie2",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
      },
      {
        id: "serie3",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
      },
      {
        id: "serie4",
        poster:
          "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
      },
      {
        id: "serie5",
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
      },
    ],
  },
  {
    id: "category5",
    title: "Top 10",
    contents: [
      {
        id: "serie1",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
      },
      {
        id: "serie2",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
      },
      {
        id: "serie3",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
      },
      {
        id: "serie4",
        poster:
          "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
      },
      {
        id: "serie5",
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
      },
    ],
  },
];

export default categories;
