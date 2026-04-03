import { useState } from "react";
import { type MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageButton } from "../components/pagebutton";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const MoviesPage = () => {
  const [page, setPage] = useState(1); //페이지 설정
  const { category } = useParams<{ category: string }>(); //보여줄 페이지 설정 -> 구조분해할당 --> 스터디에서 같이 공부

  const { data, isPending, isError } = useCustomFetch<MovieResponse>( //영화 정보 가져오기 -> useCustomFetch 커스텀 훅 사용
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
  );

  if (isError) {
    //에러인 경우 처리
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다!</span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4">
        <PageButton page={page} setPage={setPage} />
      </div>

      {isPending && ( //pending 상태
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && ( //pending 상태가 아닐 때
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviesPage;
