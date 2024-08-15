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
    myList?: (Movie | Series)[];
  };

  type Category = {
    id: string;
    title: string;
    type: "series" | "movie" | "mixed";
    contents: {
      id: string;
      type: "movie" | "series";
      title: string;
      poster: string;
    }[];
  };

  type EntertainmentContent = {
    id: string;
    type: "movie" | "series";
    title: string;
    year: number;
    plot: string;
    cast: string;
    creator: string;
    poster: string;
  };

  type Series = EntertainmentContent & {
    type: "series";
    numberOfSeasons: number;
    seasons: Season[];
  };

  type Movie = EntertainmentContent & {
    type: "movie";
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

export {
  User,
  Profile,
  Category,
  ContentRepresentation,
  EntertainmentContent,
  Season,
  Episode,
};
