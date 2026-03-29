import { useEffect, useState } from 'react';
import { type Movie, type MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PageButton } from '../components/pagebutton';
import { useParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isPending, setIsPending] = useState(false); //로딩 상태
  const [isError, setIsError] = useState(false); //에러 상태
  const [page, setPage] = useState(1); //페이지 설정
  const { category } = useParams<{category: string}>(); //보여줄 페이지 설정 -> 구조분해할당 --> 스터디에서 같이 공부


  useEffect(() => { //사이드 이펙스 설정
    const fetchMovies = async () => { //동기화
      setIsPending(true);

      try { //제대로 받은 경우
        const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`, //api 연결
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGYzMzY5NDcwMDY0YTBmNzk0ZTkwMmYxZjA2ZThhOCIsIm5iZiI6MTc3NDUxMTE5MS4wNTIsInN1YiI6IjY5YzRlNDU3NWMwZGIzZDkwZjdjYWNkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LqkHpEUYnUSGSSoKovIF0yuzo61co7dTDSvbFl6u1Y4`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
      } 
      catch {
        setIsError(true); //에러 발생 시
      } 
      finally { //무조건 실행
        setIsPending(false); 
      }
    };

    fetchMovies();
  }, [page, category]); //새로고침시 해당 인자들도 같이 넘긴다=같이 새로고침 될 수 있게

  if(isError){ //에러인 경우 처리 
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다!</span>
      </div>
    );
  }

  return (
    <>
    <div>
      <PageButton page={page} setPage={setPage} /> 
    </div>
    
    {isPending && ( //pending 상태
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner />
      </div>
    )}

    {!isPending && ( //pending 상태가 아닐 때
      <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
    )}
    </>
    
  );
};

export default MoviesPage;