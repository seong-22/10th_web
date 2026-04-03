import { useState } from "react";
import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false); //마우스 올릴 때 적용할 상태
  const navigate = useNavigate();

  return (
    <div //부모요소-영화 카드 목록
      onClick={() => navigate(`/movies/details/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 
        transition-transform duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} //영화 이미지 연결
        alt={`${movie.title}의 이미지`} //이미지 안 뜰때 처리
        className=""
      ></img>

      {/* 이미지에 마우스 올려댔을 때의 스타일 설정 1. 전체 설정 2. 영화제목 설정 3. 영화 설명 설정*/}
      {isHovered && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
        backdrop-blur-md flex flex-col justify-center items-center text-white p-4"
        >
          <h2 className="text-lg font-bold text-center leading-snug">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
