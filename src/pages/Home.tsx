import { useEffect, useState } from "react";
import request from "../utils/request";

import infoIcon from "../images/info.png";
import playIcon from "../images/play-button-arrowhead.png";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

const Home = (): JSX.Element => {
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[] | null>(
    null
  );
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      const fetchNetflixOriginals = fetch(request.NetflixOriginals).then(
        (response) => response.json()
      );

      const fetchComedyMovies = fetch(request.ComedyMovies).then((response) =>
        response.json()
      );
      const fetchThrillerMovies = fetch(request.ThrillerMovies).then(
        (response) => response.json()
      );
      const fetchActionMovies = fetch(request.ActionMovies).then((response) =>
        response.json()
      );
      const fetchRomanceMovies = fetch(request.RomanceMovies).then((response) =>
        response.json()
      );

      const [
        netflixOriginals,
        comedyMovies,
        actionMovies,
        thrillerMovies,
        romanceMovies,
      ] = await Promise.all([
        fetchNetflixOriginals,
        fetchComedyMovies,
        fetchActionMovies,
        fetchThrillerMovies,
        fetchRomanceMovies,
      ]);

      setNetflixOriginals(netflixOriginals.results);
    };

    getMovies();
  }, []);

  useEffect(() => {
    netflixOriginals != null &&
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
  }, [netflixOriginals]);

  console.log(movie);

  return (
    <div className="w-full flex flex-col  justify-center h-[95vh]  text-gray-100">
      <div className="absolute bg-gradient-to-t from-black w-full h-full -z-10"></div>

      <img
        src={`https://image.tmdb.org/t/p/original/${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title}
        className="absolute top-0 left-0 -z-20 h-[95vh] w-screen"
      />

      <div className="flex flex-col gap-5 max-w-3xl p-6 ml-20">
        <h1 className="text-7xl">{movie?.title || movie?.original_title}</h1>
        <p className="text-3xl">{movie?.overview}</p>

        <div className="flex gap-3 text-4xl font-medium text-black">
          <button className="bg-white   px-20 py-2 rounded-lg flex gap-5 items-center hover:bg-gray-300 ">
            <img src={playIcon} alt="play" className="w-[35px] h-[35px]" />
            Play
          </button>
          <button className=" bg-gray-400 px-20 py-2 rounded-lg flex gap-5 items-center hover:bg-gray-500 ">
            <img src={infoIcon} alt="info" className="w-[35px] h-[35px]" />
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
