import { useState, useEffect } from "react";
import { Movie } from "../pages/Home";
import { SiNetflix } from "react-icons/si";
import { IconContext } from "react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

type GenreProps = {
  genreMovies: Movie[] | null;
  title: string;
};

const Genre = ({ genreMovies, title }: GenreProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    if (genreMovies !== null) {
      setMovies(genreMovies);
    }
  }, [genreMovies]);
  console.log(movies);

  return (
    <div className="ml-20 flex flex-col gap-10">
      <div>
        <h1 className="text-white text-4xl font-bold">{title}</h1>
      </div>
      <div className=" mb-4">
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          navigation={true}
          modules={[Navigation]}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {" "}
          {movies &&
            movies.map((movie: Movie) => (
              <SwiperSlide>
                {" "}
                <div
                  key={movie.id}
                  className="lg:w-[440px] cursor-pointer p-2  relative "
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                    alt={movie?.title}
                    className="w-full h-full block"
                  />
                  <div className="absolute top-5 left-5">
                    <IconContext.Provider value={{ color: "red", size: "2em" }}>
                      <SiNetflix />
                    </IconContext.Provider>
                  </div>

                  <div className="bg-black text-white w-[500px] h-[4009px] absolute -top-20 letf-0 -translate-x-9 opacity-0 hover:opacity-100 z-20 duration-700 ease-in-out rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${
                        movie?.backdrop_path || movie?.poster_path
                      }`}
                      alt={movie?.title}
                      className="w-full h-[280px] "
                    />
                    <h2>{movie.title}</h2>
                    <div>
                      <p>{movie.release_date}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Genre;
