import React from "react";
import netflixAvatar from "../images/Netflix-avatar.png";
import netflixLogo from "../images/netflix-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Nav = {
  name: string;
  id: number;
  url: string;
};

const nav: Nav[] = [
  {
    name: "Strona główna",
    id: 1,
    url: "main",
  },
  {
    name: "Filmy",
    id: 2,
    url: "films",
  },
  {
    name: "Seriale i programy",
    id: 3,
    url: "serials",
  },
];

const Navigation: React.FC<unknown> = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const handleNavigate = (): void => {
    navigation("/main");
  };

  return (
    <header className="flex gap-6 max-w-full py-1 px-12 h-auto">
      <div>
        <img
          src={netflixLogo}
          alt="Netflix Logo"
          className="w-36 h-20 cursor-pointer"
          onClick={handleNavigate}
        />
      </div>
      <nav className="flex justify-center center items-center ml-6">
        <ul className="flex gap-6">
          {nav.map((element: Nav) => {
            const { name, id, url }: Nav = element;

            return (
              <li
                className="text-gray-300 hover:text-gray-400 duration-500 text-lg  cursor-pointer active:bg-amber-500"
                key={id}
              >
                <Link
                  className={`${
                    location.pathname == `/${url}` && "text-white font-bold"
                  }`}
                  to={`/${url}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center ml-auto">
        <img
          src={netflixAvatar}
          alt="Netflix Avatar"
          className="w-12 h-12 rounded-lg "
        />
      </div>
    </header>
  );
};

export default Navigation;
