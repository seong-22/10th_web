import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const { movieID } = useParams<{ movieID: string }>();
  const [movie, setMovie] = useState<any>(null); //영화 상세 정보
  const [credits, setCredits] = useState<any>(null); //영화 출연진 정보
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDate = async () => {
      setIsPending(true);

      try {
        const [detailRes, creditsRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            },
          ),
        ]);

        setMovie(detailRes.data);
        setCredits(creditsRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDate();
  }, [movieID]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {" "}
      {/*전체 배경화면 색 설정, 글자 색상 설정*/}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* 1. 영화 포스터 */}
          <div className="flex-shrink-0 w-full md:w-72">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className="w-full rounded-2xl shadow-2xl border border-slate-700"
            />
          </div>

          {/* 2. 영화 제목, 개봉일, 런타임, 줄거리 */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>

            <div className="flex items-center gap-4 text-slate-400 mb-6">
              <span>개봉일 {movie?.release_date}</span>
              <span>|</span>
              <span>런타임 {movie?.runtime}분</span>
              <span>|</span>
              <span className="text-yellow-400">
                평점 {movie?.vote_average?.toFixed(1)}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">줄거리</h3>
            <p className="text-slate-300 leading-relaxed max-w-2xl">
              {movie?.overview || "등록된 줄거리가 없습니다."}
            </p>
          </div>
        </div>

        {/* 하단 섹션: 출연진 목록 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">출연진</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700">
            {credits?.cast?.slice(0, 10).map((person: any) => (
              <div key={person.id} className="min-w-[120px] text-center">
                {/* 출연진 사진 (없을 경우 기본 이미지) */}
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/150"
                    }
                    className="w-full h-full object-cover"
                    alt={person.name}
                  />
                </div>
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-slate-400">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
