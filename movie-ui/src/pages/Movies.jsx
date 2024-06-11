import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";
import { getGenres, fetchMovies } from "../store";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.movie.movies);
  const genres = useSelector((state) => state.movie.genres)
  const genresLoaded = useSelector((state) => state.movie.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="movie"/>
        <Slider movies={movies} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
  }
`;
