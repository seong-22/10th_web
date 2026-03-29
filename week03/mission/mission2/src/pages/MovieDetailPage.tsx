import { useParams } from "react-router-dom";

const MovieDetailPage = () =>{
    const params = useParams();

    return <div>movie number: {params.movieID}</div>;
};

export default MovieDetailPage;