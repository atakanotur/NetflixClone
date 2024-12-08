const newAndPopularCategories: Category[] = [
  {
    id: "newAndPopularCategory1",
    title: "Very Soon",
    type: "mixed",
    contents: [
      {
        id: "movie2",
        type: "movie",
        title: "The Tomorrow War",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/5/5e/The_Tomorrow_War_poster.jpg",
        cast: "Chris Pratt, Yvonne Strahovski, J.K. Simmons",
        creator: "Chris McKay",
        plot: "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront his past.",
        video: "https://www.youtube.com/watch?v=8Z8g1g1g1g1",
        year: 2021,
        trailer: "https://www.youtube.com/watch?v=8Z8g1g1g1g1",
      },
      {
        id: "movie3",
        type: "series",
        title: "Dune",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/8/81/Dune_2021_poster.jpg",
        cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
        creator: "Denis Villeneuve",
        plot: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
        numberOfSeasons: 2,
        seasons: [
          {
            id: "season1",
            name: "Season 1",
            episodes: [
              {
                id: "episode1",
                title: "Episode 1: Dune",
                duration: "45 min",
                plot: "In a future where humanity has colonized other planets, a young nobleman must navigate political intrigue and betrayal.",
                poster:
                  "https://upload.wikimedia.org/wikipedia/en/8/81/Dune_2021_poster.jpg",
                video: "https://www.youtube.com/watch?v=example_video_link",
              },
            ],
          },
          {
            id: "season2",
            name: "Season 2",
            episodes: [],
          },
        ],
        year: 2021,
        trailer: "https://www.youtube.com/watch?v=n9xhJrPXop4",
      },
    ],
  },
  {
    id: "newAndPopularCategory2",
    title: "Everyone is Watching These",
    type: "mixed",
    contents: [
      {
        id: "series2",
        type: "series",
        title: "Stranger Things",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/3/38/Stranger_Things_season_3.jpg",
        cast: "Winona Ryder, David Harbour, Finn Wolfhard",
        creator: "The Duffer Brothers",
        plot: "A group of kids uncover supernatural mysteries in their small town.",
        year: 2016,
        numberOfSeasons: 3,
        seasons: [],
        trailer: "https://www.youtube.com/watch?v=XWxyRG7q8eA",
      },
      {
        id: "movie4",
        type: "movie",
        title: "Avatar: The Way of Water",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/b/b9/Avatar_The_Way_of_Water_poster.jpg",
        cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        creator: "James Cameron",
        plot: "Jake Sully and Neytiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
        video: "https://www.youtube.com/watch?v=6ziBFh3V1y8",
        year: 2022,
        trailer: "https://www.youtube.com/watch?v=6ziBFh3V1y8",
      },
    ],
  },
  {
    id: "newAndPopularCategory3",
    title: "Top 10 Series List",
    type: "series",
    contents: [
      {
        id: "series1",
        type: "series",
        title: "Wednesday",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e",
        cast: "Jenna Ortega, Gwendoline Christie, Riki Lindhome",
        creator: "Alfred Gough, Miles Millar",
        plot: "Follows Wednesday Addams' years as a student, where she tries to master her psychic ability and solve a murder mystery.",
        year: 2022,
        numberOfSeasons: 1,
        seasons: [],
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
      },
      {
        id: "series3",
        type: "series",
        title: "The Sandman",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/0/0e/The_Sandman_%28TV_series%29_poster.jpg",
        cast: "Tom Sturridge, Gwendoline Christie, Charles Dance",
        creator: "Neil Gaiman",
        plot: "When Morpheus, the Dream King, escapes captivity, he sets out to restore order to his realm.",
        year: 2022,
        numberOfSeasons: 1,
        seasons: [],
        trailer: "https://www.youtube.com/watch?v=Z2Z2Z2Z2Z2Z2",
      },
    ],
  },
  {
    id: "newAndPopularCategory4",
    title: "Top 10 Movies List",
    type: "movie",
    contents: [
      {
        id: "movie1",
        type: "movie",
        title: "Project Power",
        poster: "https://pbs.twimg.com/media/Ec_7SzOUEAAuGit.jpg:large",
        cast: "Jamie Foxx, Joseph Gordon-Levitt, Dominique Fishback",
        creator: "Henry Joost, Ariel Schulman",
        plot: "A pill that grants superpowers for five minutes falls into the wrong hands, and a cop teams up with a teenage dealer to fight the chaos.",
        video: "https://www.youtube.com/watch?v=xw1vQgVaYNQ",
        year: 2020,
        trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
      },
      {
        id: "movie5",
        type: "movie",
        title: "The Flash",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/6/6e/The_Flash_%282023_film%29_poster.jpg",
        cast: "Ezra Miller, Michael Keaton, Sasha Calle",
        creator: "Andy Muschietti",
        plot: "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without superheroes.",
        video: "https://www.youtube.com/watch?v=Z1Z1Z1Z1Z1Z1",
        year: 2023,
        trailer: "https://www.youtube.com/watch?v=Z1Z1Z1Z1Z1Z1",
      },
    ],
  },
];

export default newAndPopularCategories;
