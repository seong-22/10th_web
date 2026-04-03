export type Movie = { //영화 하나에 담긴 정보들
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_count: number;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
}

export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}