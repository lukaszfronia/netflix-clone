import { useEffect, useState } from "react";
import request from "../utils/request";

import { FiAlertCircle } from "react-icons/fi";
import { ImPlay3 } from "react-icons/im";
import { IconContext } from "react-icons";

import Genre from "../components/Genre";

export type Movie = {
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
type TrimText = (text?: string, size?: number) => string | undefined;

const Home = (): JSX.Element => {
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[] | null>(
    null
  );
  const [comedyMovies, setComedyMovies] = useState<Movie[] | null>(null);
  const [actionMovies, setActionMovies] = useState<Movie[] | null>(null);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[] | null>(null);
  const [romanceMovies, setRomanceMovies] = useState<Movie[] | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[] | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
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
      const fetchPopularMovies = fetch(request.PopuralMovies).then((response) =>
        response.json()
      );
      const [
        netflixOriginals,
        comedyMovies,
        actionMovies,
        thrillerMovies,
        romanceMovies,
        popularMovies,
      ] = await Promise.all([
        fetchNetflixOriginals,
        fetchComedyMovies,
        fetchActionMovies,
        fetchThrillerMovies,
        fetchRomanceMovies,
        fetchPopularMovies,
      ]);

      setNetflixOriginals(netflixOriginals.results);
      setComedyMovies(comedyMovies.results);
      setActionMovies(actionMovies.results);
      setThrillerMovies(thrillerMovies.results);
      setRomanceMovies(romanceMovies.results);
      setPopularMovies(popularMovies.results);
    };
    getMovies();
  }, []);

  useEffect(() => {
    netflixOriginals != null &&
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
  }, [netflixOriginals]);

  const trimText: TrimText = (text = "Something goes wrong", size = 200) => {
    if (text !== undefined) {
      if (text.length >= size) {
        return text?.slice(0, size) + "...";
      } else {
        return text;
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col  justify-center h-[900px]  text-gray-100">
        <div className="absolute bg-gradient-to-t from-black w-full h-full -z-10"></div>

        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt={movie?.title}
          className="absolute top-0 left-0 -z-20 h-[95vh] w-screen"
        />

        <div className="flex flex-col gap-5 max-w-4xl p-6 ml-20">
          <h1 className="text-7xl font-bold">
            {movie?.title || movie?.original_title}
          </h1>
          <p className="text-3xl">{trimText(movie?.overview, 250)}</p>
          <div className="flex gap-3 font-semibold text-2xl ">
            <IconContext.Provider value={{ size: "1.8em" }}>
              <button className="bg-white text-black  px-20 py-2 rounded-lg flex gap-5 items-center hover:bg-gray-300 ">
                <ImPlay3 />
                Play
              </button>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
              <button className=" bg-[#6d6d6eb2] px-20 py-2 text-2xl rounded-lg flex gap-5 items-center hover:bg-[#6d6d6e66] ">
                <FiAlertCircle />
                More Info
              </button>
            </IconContext.Provider>
          </div>
        </div>
      </div>

      <Genre genreMovies={popularMovies} title="Now Popular" />
      <Genre genreMovies={comedyMovies} title="Comedy" />
      <Genre genreMovies={actionMovies} title="Action" />
      <Genre genreMovies={thrillerMovies} title="Thriller" />
      <Genre genreMovies={romanceMovies} title="Romance" />
    </>
  );
};

export default Home;
