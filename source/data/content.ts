const contents: (Movie | Series)[] = [
  {
    id: "movie1",
    type: "movie",
    title: "Project Power",
    year: 2020,
    plot: "A former soldier teams up with a cop to find the source behind a dangerous pill that provides temporary superpowers.",
    cast: "Jamie Foxx, Joseph Gordon-Levitt, Dominique Fishback",
    creator: "Henry Joost, Ariel Schulman",
    poster: "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
  },
  {
    id: "movie2",
    type: "movie",
    title: "The Gray Man",
    year: 2022,
    plot: "When a shadowy CIA agent uncovers damning agency secrets, he's hunted across the globe by a sociopathic rogue operative.",
    cast: "Ryan Gosling, Chris Evans, Ana de Armas",
    creator: "Anthony Russo, Joe Russo",
    poster:
      "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
  },
  {
    id: "series1",
    type: "series",
    title: "Wednesday",
    year: 2022,
    plot: "Follows Wednesday Addams' years as a student, as she attempts to master her emerging psychic ability.",
    cast: "Jenna Ortega, Catherine Zeta-Jones, Luis Guzmán",
    creator: "Alfred Gough, Miles Millar",
    poster:
      "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
    numberOfSeasons: 1,
    seasons: [
      {
        id: "season1",
        name: "Season 1",
        episodes: [
          {
            id: "episode1",
            title: "Wednesday's Child",
            poster: "wednesday_s1_e1_poster.jpg",
            duration: "49m",
            plot: "Wednesday Addams begins her school life at Nevermore Academy and faces several challenges.",
            video: "wednesday_s1_e1_video.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "series2",
    type: "series",
    title: "1899",
    year: 2022,
    plot: "Multinational immigrants traveling from the old continent to the new encounter a nightmarish riddle aboard a second ship adrift on the open sea.",
    cast: "Emily Beecham, Aneurin Barnard, Andreas Pietschmann",
    creator: "Jantje Friese, Baran bo Odar",
    poster:
      "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
    numberOfSeasons: 1,
    seasons: [
      {
        id: "season1",
        name: "Season 1",
        episodes: [
          {
            id: "episode1",
            title: "The Ship",
            poster: "1899_s1_e1_poster.jpg",
            duration: "60m",
            plot: "The passengers aboard the Kerberos are in for a surprise when they encounter a mysterious ship.",
            video: "1899_s1_e1_video.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "series3",
    type: "series",
    title: "Dark",
    year: 2017,
    plot: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    cast: "Louis Hofmann, Karoline Eichhorn, Lisa Vicari",
    creator: "Baran bo Odar, Jantje Friese",
    poster:
      "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
    numberOfSeasons: 3,
    seasons: [
      {
        id: "season1",
        name: "Season 1",
        episodes: [
          {
            id: "episode1",
            title: "Secrets",
            poster: "dark_s1_e1_poster.jpg",
            duration: "51m",
            plot: "In 2019, a local boy's disappearance stokes fear in the residents of Winden, a small German town with a strange history.",
            video: "dark_s1_e1_video.mp4",
          },
        ],
      },
    ],
  },
];

export default contents;
