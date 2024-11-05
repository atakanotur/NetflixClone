const newAndPopularCategories: Category[] = [
  {
    id: "newAndPopularCategory1",
    title: "Very Soon",
    type: "mixed",
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
        id: "movie2",
        type: "movie",
        title: "The Gray Man",
        poster:
          "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUNjavGNLx726Pz9ZVbVca9TYbA2wReQdgKp-NXHw3QTnVU9tSxVEvWLBURMX8LmWpu6M6sxlpUZCcM2p_sqQBGg9MNS3UOlY2axxZ6scJa1QCpJrQXrFaXABLJZQaJdHj2setyYXqipKeNkwhk-6GJa.jpg?r=396",
        cast: "Ryan Gosling, Chris Evans, Ana de Armas",
        creator: "Anthony Russo, Joe Russo",
        plot: "A highly skilled CIA operative becomes the target of international assassins after uncovering dark agency secrets.",
        video: "https://www.youtube.com/watch?v=BPGd3WRG6HA",
        year: 2022,
        trailer: "https://www.youtube.com/watch?v=BPGd3WRG6HA",
      },
      {
        id: "movie3",
        type: "movie",
        title: "Inception",
        poster:
          "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        creator: "Christopher Nolan",
        plot: "A thief who enters the subconscious of his targets to steal secrets is offered a chance to have his criminal record erased if he can plant an idea instead.",
        video: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        year: 2010,
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      },
      {
        id: "movie4",
        type: "movie",
        title: "Interstellar",
        poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        creator: "Christopher Nolan",
        plot: "A team of astronauts travel through a wormhole in search of a new home for humanity.",
        video: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        year: 2014,
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      },
      {
        id: "movie5",
        type: "movie",
        title: "The Matrix",
        poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
        cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        creator: "The Wachowskis",
        plot: "A hacker learns that the world he lives in is a simulation and joins a rebellion to overthrow its controllers.",
        video: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
        year: 1999,
        trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
      },
      {
        id: "movie6",
        type: "movie",
        title: "The Dark Knight",
        poster: "https://m.media-amazon.com/images/I/81AJdOIEI2L._SL1500_.jpg",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
        creator: "Christopher Nolan",
        plot: "Batman must face the Joker, a criminal mastermind who seeks to plunge Gotham into anarchy.",
        video: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        year: 2008,
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      },
      {
        id: "movie7",
        type: "movie",
        title: "Fight Club",
        poster:
          "https://m.media-amazon.com/images/I/71KQwmqO8LL._AC_SY679_.jpg",
        cast: "Brad Pitt, Edward Norton, Helena Bonham Carter",
        creator: "David Fincher",
        plot: "An insomniac office worker and a devil-may-care soap salesman form an underground fight club.",
        video: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
        year: 1999,
        trailer: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
      },
      {
        id: "movie8",
        type: "movie",
        title: "Pulp Fiction",
        poster:
          "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
        creator: "Quentin Tarantino",
        plot: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        video: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
        year: 1994,
        trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      },
      {
        id: "movie9",
        type: "movie",
        title: "The Shawshank Redemption",
        poster: "https://m.media-amazon.com/images/I/51NiGlapXlL.jpg",
        cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
        creator: "Frank Darabont",
        plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        video: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
        year: 1994,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
      },
      {
        id: "movie10",
        type: "movie",
        title: "Forrest Gump",
        poster:
          "https://m.media-amazon.com/images/I/61JcGgDZX4L._AC_SY679_.jpg",
        cast: "Tom Hanks, Robin Wright, Gary Sinise",
        creator: "Robert Zemeckis",
        plot: "The presidencies of Kennedy and Johnson, the Vietnam War, and Watergate all unfold from the perspective of an Alabama man with a low IQ.",
        video: "https://www.youtube.com/watch?v=bLvqoHBptjg",
        year: 1994,
        trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg",
      },
    ],
  },
  {
    id: "newAndPopularCategory2",
    title: "Everyone is Watching These",
    type: "mixed",
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
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
        seasons: [
          {
            id: "season1",
            name: "Season 1",
            episodes: [
              {
                id: "episode1",
                title: "Wednesday's Child",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "Wednesday Addams begins her school life at Nevermore Academy and faces several challenges.",
                video: "https://example.com/videos/wednesday_s1_e1_video.mp4",
              },
              {
                id: "episode2",
                title: "A Dark Beginning",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "50m",
                plot: "Wednesday uncovers a mysterious secret about her family that ties her to Nevermore's dark history.",
                video: "https://example.com/videos/wednesday_s1_e2_video.mp4",
              },
              {
                id: "episode3",
                title: "The Raven's Whisper",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "48m",
                plot: "As strange things happen at school, Wednesday is determined to investigate a haunting presence.",
                video: "https://example.com/videos/wednesday_s1_e3_video.mp4",
              },
              {
                id: "episode4",
                title: "Unseen Forces",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "47m",
                plot: "Wednesday and her friends try to decipher an ancient prophecy that threatens the academy.",
                video: "https://example.com/videos/wednesday_s1_e4_video.mp4",
              },
              {
                id: "episode5",
                title: "The Black Cat's Curse",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "A mysterious curse begins affecting students, and Wednesday must find its source before it's too late.",
                video: "https://example.com/videos/wednesday_s1_e5_video.mp4",
              },
              {
                id: "episode6",
                title: "Moonlit Secrets",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "50m",
                plot: "Wednesday uncovers a hidden chamber beneath Nevermore, revealing dark secrets about the academy's past.",
                video: "https://example.com/videos/wednesday_s1_e6_video.mp4",
              },
              {
                id: "episode7",
                title: "Shadows in the Hall",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "A shadowy figure stalks Wednesday, forcing her to confront long-buried fears from her past.",
                video: "https://example.com/videos/wednesday_s1_e7_video.mp4",
              },
              {
                id: "episode8",
                title: "The Midnight Gathering",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "52m",
                plot: "Wednesday uncovers a secret society at Nevermore and tries to stop their dark ritual.",
                video: "https://example.com/videos/wednesday_s1_e8_video.mp4",
              },
              {
                id: "episode9",
                title: "The Final Prophecy",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "53m",
                plot: "As the prophecy comes to light, Wednesday must make a sacrifice to save Nevermore and her friends.",
                video: "https://example.com/videos/wednesday_s1_e9_video.mp4",
              },
            ],
          },
        ],
      },
      {
        id: "series2",
        type: "series",
        title: "1899",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
        cast: "Emily Beecham, Andreas Pietschmann, Aneurin Barnard",
        creator: "Baran bo Odar, Jantje Friese",
        plot: "Multinational immigrants traveling to the new continent encounter a terrifying riddle aboard a second ship adrift on the open sea.",
        year: 2022,
        numberOfSeasons: 1,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
        cast: "Louis Hofmann, Karoline Eichhorn, Lisa Vicari",
        creator: "Baran bo Odar, Jantje Friese",
        plot: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes time travel secrets.",
        year: 2017,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://m.media-amazon.com/images/I/91tL9dSx7QL._AC_SL1500_.jpg",
        cast: "Winona Ryder, David Harbour, Finn Wolfhard",
        creator: "The Duffer Brothers",
        plot: "When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
        year: 2016,
        numberOfSeasons: 4,
        trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
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
        poster: "https://m.media-amazon.com/images/I/81N5-QAT0jL._SL1500_.jpg",
        cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
        creator: "Vince Gilligan",
        plot: "A high school chemistry teacher turned methamphetamine producer partners with a former student to build a drug empire.",
        year: 2008,
        numberOfSeasons: 5,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/81tsODkA+nL._SL1500_.jpg",
        cast: "Emilia Clarke, Peter Dinklage, Kit Harington",
        creator: "David Benioff, D.B. Weiss",
        plot: "Nine noble families wage war against each other to gain control of the Iron Throne.",
        year: 2011,
        numberOfSeasons: 8,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/81wV2cjHFzL._SL1500_.jpg",
        cast: "Henry Cavill, Anya Chalotra, Freya Allan",
        creator: "Lauren Schmidt Hissrich",
        plot: "Geralt of Rivia, a mutated monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        year: 2019,
        numberOfSeasons: 8,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        id: "series8",
        type: "series",
        title: "The Mandalorian",
        poster: "https://m.media-amazon.com/images/I/81jR6QFDneL._SL1500_.jpg",
        cast: "Pedro Pascal, Carl Weathers, Gina Carano",
        creator: "Jon Favreau",
        plot: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        year: 2019,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://m.media-amazon.com/images/I/71liRxYQy7L._AC_SL1500_.jpg",
        cast: "Claire Foy, Olivia Colman, Imelda Staunton",
        creator: "Peter Morgan",
        plot: "Follows the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.",
        year: 2016,
        numberOfSeasons: 5,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/91VYtnB0gfL._SL1500_.jpg",
        cast: "Karl Urban, Jack Quaid, Antony Starr",
        creator: "Eric Kripke",
        plot: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        year: 2019,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
        seasons: [
          {
            id: "season1",
            name: "Season 1",
            episodes: [
              {
                id: "episode1",
                title: "Wednesday's Child",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "Wednesday Addams begins her school life at Nevermore Academy and faces several challenges.",
                video: "https://example.com/videos/wednesday_s1_e1_video.mp4",
              },
              {
                id: "episode2",
                title: "A Dark Beginning",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "50m",
                plot: "Wednesday uncovers a mysterious secret about her family that ties her to Nevermore's dark history.",
                video: "https://example.com/videos/wednesday_s1_e2_video.mp4",
              },
              {
                id: "episode3",
                title: "The Raven's Whisper",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "48m",
                plot: "As strange things happen at school, Wednesday is determined to investigate a haunting presence.",
                video: "https://example.com/videos/wednesday_s1_e3_video.mp4",
              },
              {
                id: "episode4",
                title: "Unseen Forces",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "47m",
                plot: "Wednesday and her friends try to decipher an ancient prophecy that threatens the academy.",
                video: "https://example.com/videos/wednesday_s1_e4_video.mp4",
              },
              {
                id: "episode5",
                title: "The Black Cat's Curse",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "A mysterious curse begins affecting students, and Wednesday must find its source before it's too late.",
                video: "https://example.com/videos/wednesday_s1_e5_video.mp4",
              },
              {
                id: "episode6",
                title: "Moonlit Secrets",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "50m",
                plot: "Wednesday uncovers a hidden chamber beneath Nevermore, revealing dark secrets about the academy's past.",
                video: "https://example.com/videos/wednesday_s1_e6_video.mp4",
              },
              {
                id: "episode7",
                title: "Shadows in the Hall",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "49m",
                plot: "A shadowy figure stalks Wednesday, forcing her to confront long-buried fears from her past.",
                video: "https://example.com/videos/wednesday_s1_e7_video.mp4",
              },
              {
                id: "episode8",
                title: "The Midnight Gathering",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "52m",
                plot: "Wednesday uncovers a secret society at Nevermore and tries to stop their dark ritual.",
                video: "https://example.com/videos/wednesday_s1_e8_video.mp4",
              },
              {
                id: "episode9",
                title: "The Final Prophecy",
                poster:
                  "https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/74/2498/49116/145815/SST4L5d2sZxuhViobb1qcs2rwSTpaQgkEdGy9OBsUOg.jpg",
                duration: "53m",
                plot: "As the prophecy comes to light, Wednesday must make a sacrifice to save Nevermore and her friends.",
                video: "https://example.com/videos/wednesday_s1_e9_video.mp4",
              },
            ],
          },
        ],
      },
      {
        id: "series2",
        type: "series",
        title: "1899",
        poster:
          "https://images.ctfassets.net/4cd45et68cgf/4g2KWWsb3asC3VQVYS2eSs/3d1520b9ef5dac16f7ee6b06da3b3e73/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg?w=2000",
        cast: "Emily Beecham, Andreas Pietschmann, Aneurin Barnard",
        creator: "Baran bo Odar, Jantje Friese",
        plot: "Multinational immigrants traveling to the new continent encounter a terrifying riddle aboard a second ship adrift on the open sea.",
        year: 2022,
        numberOfSeasons: 1,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://preview.redd.it/aw62ganh7o801.jpg?width=1080&crop=smart&auto=webp&s=ffc697b5137e83f378ded23cc348d58cbfdc5393",
        cast: "Louis Hofmann, Karoline Eichhorn, Lisa Vicari",
        creator: "Baran bo Odar, Jantje Friese",
        plot: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes time travel secrets.",
        year: 2017,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://m.media-amazon.com/images/I/91tL9dSx7QL._AC_SL1500_.jpg",
        cast: "Winona Ryder, David Harbour, Finn Wolfhard",
        creator: "The Duffer Brothers",
        plot: "When a young boy disappears, a small town uncovers a mystery involving secret experiments and supernatural forces.",
        year: 2016,
        numberOfSeasons: 4,
        trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
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
        poster: "https://m.media-amazon.com/images/I/81N5-QAT0jL._SL1500_.jpg",
        cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
        creator: "Vince Gilligan",
        plot: "A high school chemistry teacher turned methamphetamine producer partners with a former student to build a drug empire.",
        year: 2008,
        numberOfSeasons: 5,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/81tsODkA+nL._SL1500_.jpg",
        cast: "Emilia Clarke, Peter Dinklage, Kit Harington",
        creator: "David Benioff, D.B. Weiss",
        plot: "Nine noble families wage war against each other to gain control of the Iron Throne.",
        year: 2011,
        numberOfSeasons: 8,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/81wV2cjHFzL._SL1500_.jpg",
        cast: "Henry Cavill, Anya Chalotra, Freya Allan",
        creator: "Lauren Schmidt Hissrich",
        plot: "Geralt of Rivia, a mutated monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        year: 2019,
        numberOfSeasons: 8,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        id: "series8",
        type: "series",
        title: "The Mandalorian",
        poster: "https://m.media-amazon.com/images/I/81jR6QFDneL._SL1500_.jpg",
        cast: "Pedro Pascal, Carl Weathers, Gina Carano",
        creator: "Jon Favreau",
        plot: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        year: 2019,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster:
          "https://m.media-amazon.com/images/I/71liRxYQy7L._AC_SL1500_.jpg",
        cast: "Claire Foy, Olivia Colman, Imelda Staunton",
        creator: "Peter Morgan",
        plot: "Follows the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.",
        year: 2016,
        numberOfSeasons: 5,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
        poster: "https://m.media-amazon.com/images/I/91VYtnB0gfL._SL1500_.jpg",
        cast: "Karl Urban, Jack Quaid, Antony Starr",
        creator: "Eric Kripke",
        plot: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        year: 2019,
        numberOfSeasons: 3,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
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
  },
  {
    id: "newAndPopularCategory4",
    title: "Top 10 Movies List",
    type: "movie",
    contents: [
      {
        id: "movie5",
        type: "movie",
        title: "The Matrix",
        poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
        cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        creator: "The Wachowskis",
        plot: "A hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        video: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
        year: 1999,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
      },
      {
        id: "movie3",
        type: "movie",
        title: "Inception",
        poster:
          "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        creator: "Christopher Nolan",
        plot: "A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into a target's subconscious.",
        video: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        year: 2010,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
      },
      {
        id: "movie4",
        type: "movie",
        title: "Interstellar",
        poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        creator: "Christopher Nolan",
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        video: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        year: 2014,
        trailer: "https://www.youtube.com/watch?v=NmzuHjWmXOc",
      },
    ],
  },
];

export default newAndPopularCategories;
