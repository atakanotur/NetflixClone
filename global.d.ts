declare global {
  type User = {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;
    profiles: Profile[];
  };
  type Profile = {
    id: string;
    name: string;
    imageUrl: string;
    locked: boolean;
    password?: string;
    myList?: Movie[];
  };

  type Category = {
    id: string;
    title: string;
    movies: MovieRepresentation[];
  };

  type MovieRepresentation = {
    id: string;
    poster: string;
  };

  type Movie = {
    id: string;
    title: string;
    year: number;
    numberOfSeasons: number;
    plot: string;
    cast: string;
    creator: string;
    seasons: Season[];
  };

  type Season = {
    id: string;
    name: string;
    episodes: Episode[];
  };

  type Episode = {
    id: string;
    title: string;
    poster: string;
    duration: string;
    plot: string;
    video: string;
  };
}

export { User, Profile, Category, MovieRepresentation, Movie, Season, Episode };
