import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import MovieBox from "../components/MovieBox";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie } from "../store";

export default function Search() {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const searchMovies = useSelector((state) => state.movie.searchMovies);

  useEffect(() => {
    dispatch(searchMovie({ search }));
  }, [search]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  console.log(searchMovies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className={`search-container ${search === "" ? "search-none" : ""}`}>
        <input
          type="text"
          placeholder="Search MoonFlix"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-result">
          {searchMovies.map((movie) => (
            <MovieBox movieData={movie} key={movie.id} />
          ))}
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  .search-container {
    margin-top: 7rem;
    margin-bottom: 2rem;
    padding: 0 4rem;
    input {
      width: 100%;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.23);
      opacity: 1;
      padding: 0.5rem;
      height: 3rem;
      color: white;
      &:focus {
        outline: none;
        border: 2px solid #07bc0c;
      }
    }
    .search-result {
      margin-top: 3rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(247px, 1fr));
      gap: 1.5rem;
    }
  }
  .search-none {
    height: 100vh;
  }
`;
