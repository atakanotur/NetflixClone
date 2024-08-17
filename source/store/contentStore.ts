import { create } from "zustand";

type State = {
  contents: (Series | Movie)[];
};

type Action = {
  setContents: (contents: State["contents"]) => void;
};

const contentStore = create<State & Action>()((set) => ({
  contents: [
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
      id: "movie3",
      type: "movie",
      title: "Inception",
      year: 2010,
      plot: "A thief who enters the dreams of others to steal secrets finds himself trapped in a nightmare he cannot escape.",
      cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      creator: "Christopher Nolan",
      poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
    },
    {
      id: "movie4",
      type: "movie",
      title: "Interstellar",
      year: 2014,
      plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      creator: "Christopher Nolan",
      poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg",
    },
    {
      id: "movie5",
      type: "movie",
      title: "The Matrix",
      year: 1999,
      plot: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
      cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      creator: "The Wachowskis",
      poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
    },
    {
      id: "movie6",
      type: "movie",
      title: "The Dark Knight",
      year: 2008,
      plot: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
      creator: "Christopher Nolan",
      poster: "https://m.media-amazon.com/images/I/81AJdOIEI2L._SL1500_.jpg",
    },
    {
      id: "movie7",
      type: "movie",
      title: "Fight Club",
      year: 1999,
      plot: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.",
      cast: "Brad Pitt, Edward Norton, Helena Bonham Carter",
      creator: "David Fincher",
      poster: "https://m.media-amazon.com/images/I/71KQwmqO8LL._AC_SY679_.jpg",
    },
    {
      id: "movie8",
      type: "movie",
      title: "Pulp Fiction",
      year: 1994,
      plot: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
      creator: "Quentin Tarantino",
      poster: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
    },
    {
      id: "movie9",
      type: "movie",
      title: "The Shawshank Redemption",
      year: 1994,
      plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
      creator: "Frank Darabont",
      poster: "https://m.media-amazon.com/images/I/51NiGlapXlL.jpg",
    },
    {
      id: "movie10",
      type: "movie",
      title: "Forrest Gump",
      year: 1994,
      plot: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
      cast: "Tom Hanks, Robin Wright, Gary Sinise",
      creator: "Robert Zemeckis",
      poster: "https://m.media-amazon.com/images/I/61JcGgDZX4L._AC_SY679_.jpg",
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
    {
      id: "series4",
      type: "series",
      title: "Stranger Things",
      year: 2016,
      plot: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces.",
      cast: "Winona Ryder, David Harbour, Finn Wolfhard",
      creator: "The Duffer Brothers",
      poster: "https://m.media-amazon.com/images/I/91tL9dSx7QL._AC_SL1500_.jpg",
      numberOfSeasons: 4,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "The Vanishing of Will Byers",
              poster: "strangerthings_s1_e1_poster.jpg",
              duration: "47m",
              plot: "A young boy goes missing in the small town of Hawkins, leading his friends and family to a series of mysterious events.",
              video: "strangerthings_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series5",
      type: "series",
      title: "Breaking Bad",
      year: 2008,
      plot: "A high school chemistry teacher turned methamphetamine manufacturing drug dealer forms an unlikely partnership with a former student.",
      cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
      creator: "Vince Gilligan",
      poster: "https://m.media-amazon.com/images/I/81N5-QAT0jL._SL1500_.jpg",
      numberOfSeasons: 5,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "Pilot",
              poster: "breakingbad_s1_e1_poster.jpg",
              duration: "58m",
              plot: "Walter White, a high school chemistry teacher, discovers he has terminal cancer and teams up with a former student to start a meth lab.",
              video: "breakingbad_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series6",
      type: "series",
      title: "Game of Thrones",
      year: 2011,
      plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
      cast: "Emilia Clarke, Peter Dinklage, Kit Harington",
      creator: "David Benioff, D.B. Weiss",
      poster: "https://m.media-amazon.com/images/I/81tsODkA+nL._SL1500_.jpg",
      numberOfSeasons: 8,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "Winter Is Coming",
              poster: "got_s1_e1_poster.jpg",
              duration: "62m",
              plot: "In the land of Westeros, Ned Stark is asked to become the Hand of the King, setting off a chain of events that will shake the Seven Kingdoms.",
              video: "got_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series7",
      type: "series",
      title: "The Witcher",
      year: 2019,
      plot: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: "Henry Cavill, Freya Allan, Anya Chalotra",
      creator: "Lauren Schmidt Hissrich",
      poster: "https://m.media-amazon.com/images/I/81wV2cjHFzL._SL1500_.jpg",
      numberOfSeasons: 3,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "The End's Beginning",
              poster: "witcher_s1_e1_poster.jpg",
              duration: "61m",
              plot: "Geralt of Rivia comes across a conflicted princess while battling a ferocious beast.",
              video: "witcher_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series8",
      type: "series",
      title: "The Mandalorian",
      year: 2019,
      plot: "A lone bounty hunter in the outer reaches of the galaxy tries to protect a valuable asset, a child with mysterious powers.",
      cast: "Pedro Pascal, Gina Carano, Giancarlo Esposito",
      creator: "Jon Favreau",
      poster: "https://m.media-amazon.com/images/I/81jR6QFDneL._SL1500_.jpg",
      numberOfSeasons: 3,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "Chapter 1: The Mandalorian",
              poster: "mandalorian_s1_e1_poster.jpg",
              duration: "39m",
              plot: "A bounty hunter accepts a mission that will change his life forever.",
              video: "mandalorian_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series9",
      type: "series",
      title: "The Crown",
      year: 2016,
      plot: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      cast: "Claire Foy, Matt Smith, Olivia Colman",
      creator: "Peter Morgan",
      poster: "https://m.media-amazon.com/images/I/71liRxYQy7L._AC_SL1500_.jpg",
      numberOfSeasons: 5,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "Wolferton Splash",
              poster: "crown_s1_e1_poster.jpg",
              duration: "61m",
              plot: "As a young Elizabeth becomes Queen, she must manage major political changes and family pressures.",
              video: "crown_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "series10",
      type: "series",
      title: "The Boys",
      year: 2019,
      plot: "A group of vigilantes set out to take down corrupt superheroes who abuse their powers.",
      cast: "Karl Urban, Jack Quaid, Antony Starr",
      creator: "Eric Kripke",
      poster: "https://m.media-amazon.com/images/I/91VYtnB0gfL._SL1500_.jpg",
      numberOfSeasons: 3,
      seasons: [
        {
          id: "season1",
          name: "Season 1",
          episodes: [
            {
              id: "episode1",
              title: "The Name of the Game",
              poster: "theboys_s1_e1_poster.jpg",
              duration: "60m",
              plot: "Hughie Campbell suffers a devastating loss and joins a group determined to bring down The Seven, a corrupt superhero team.",
              video: "theboys_s1_e1_video.mp4",
            },
          ],
        },
      ],
    },
  ],
  setContents: (contents) => set(() => ({ contents })),
}));

export default contentStore;
