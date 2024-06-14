import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import backgroundImage from "../assets/Home.jpg";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

export default function Netflix() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const genresLoaded = useSelector((state) => state.movie.genres)
  const movies = useSelector((state) => state.movie.movies)

  const dispatch = useDispatch()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  useEffect(() => {
    dispatch(getGenres())
  },[])

  useEffect(() => {
    if(genresLoaded) {
      dispatch(fetchMovies({type: "all"}))
    }
  },[genresLoaded])


  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <h1>Atlas</h1>
            <p>
              Atlas is a 2024 American science fiction action film starring
              Jennifer Lopez as a highly skilled counterterrorism analyst,
              <br />
              who harbors a profound skepticism towards artificial intelligence,
              comes to realize that it may be her sole recourse following the
              <br />
              failure of a mission aimed at apprehending a rogue robot.
            </p>
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={() => navigate("/player")}>
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100%;
    }
    .container {
      position: absolute;
      margin-left: 5rem;
      bottom: 10rem;
      .logo {
        margin-bottom: 32px;
        h1 {
          font-size: 5rem;
          line-height: 1.235;
          letter-spacing: 0.00735em;
          font-weight: 700;
          margin-bottom: 32px;
        }
        p {
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: 0.00938em;
          text-align: justify;
        }
      }
      .buttons {
        gap: 2rem;
        button {
        font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;F
        }
      }
    }
  }
`;
