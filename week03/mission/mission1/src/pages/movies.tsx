import { useEffect, useState } from 'react';
import { type Movie, type MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => { //사이드 이펙스 설정
    const fetchMovies = async () => { //동기화
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', //api 연결
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGYzMzY5NDcwMDY0YTBmNzk0ZTkwMmYxZjA2ZThhOCIsIm5iZiI6MTc3NDUxMTE5MS4wNTIsInN1YiI6IjY5YzRlNDU3NWMwZGIzZDkwZjdjYWNkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LqkHpEUYnUSGSSoKovIF0yuzo61co7dTDSvbFl6u1Y4`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  );
};

export default MoviesPage;