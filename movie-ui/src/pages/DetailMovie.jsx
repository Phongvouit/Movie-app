import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';

export default function DetailMovie() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [detailMovie, setDetailMovie] = useState();
  const [castMovie, setCastMovie] = useState();
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()
  const params = useParams();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`
      );
      // ...
      setDetailMovie(data);
    }
    fetchData();
  }, [params.id]);

  useEffect(() => {
    async function fetchCastMovie() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}`
      );
      setCastMovie(data);
    }
    fetchCastMovie();
  }, [params.id]);

  useEffect(() => {
    async function fetchVideoMovie() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}`
      );
      setVideos(data.results);
    }
    fetchVideoMovie();
  }, [params.id]);
  console.log(videos)

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="play">
        <img
          src={`https://image.tmdb.org/t/p/w500${detailMovie?.backdrop_path}`}
          alt="playbackground"
          className="play-background"
        />
        <div className="play-text">
          <h1>{detailMovie?.original_title}</h1>
          <div className="tags">
            {detailMovie?.genres?.map((genre) => (
              <div className="tag-item">
                <span>{genre?.name}</span>
              </div>
            ))}
          </div>
          <div>
            <span>Direction: </span>
            <span>Jake Kasdan</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{detailMovie?.overview}</span>
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={() => navigate(`/player/${params.id}`)}>
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <CiBookmarkPlus />
              Watch later
            </button>
          </div>
        </div>
      </div>

      <div className="cast-container">
        <h2 className="cast-heading">CAST</h2>
        <hr className="rounded"></hr>
        <div className="cast">
          <Slider {...settings}>
            {castMovie?.cast?.map((c) => (
              <div className="cast-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${c?.profile_path}`}
                  alt=""
                  className="cast-img"
                />
                <div className="cast-name">
                  <span>{c?.name}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <YouTube videoId={videos[0]?.key}></YouTube>
      
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  .play {
    position: relative;
    max-height: 540px;
    margin-top: 104px !important;
    padding: 0 4rem;
    .play-background {
      filter: brightness(80%);
    }
  }
  img {
    max-height: 540px;
    width: 100%;
    object-fit: fill;
    object-position: center;
  }
  .play-text {
    position: absolute;
    margin-left: 5rem;
    bottom: 5rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    .tags {
      display: flex;
      align-items: center;
      column-gap: 8px;
      margin: 1rem 0;
      .tag-item {
        background: rgb(255, 0, 0);
        height: 30px;
        border-radius: 16px;
        display: inline-flex;
        align-items: center;
        span {
          padding: 0 12px;
          white-space: nowrap;
        }
      }
    }
  }
  .cast-container {
    margin-top: 3rem;
    padding: 0 4rem;
    .cast-heading {
      font-size: 1.5rem;
      line-height: 1.334;
      letter-spacing: 0em;
      font-weight: 700;
      text-transform: uppercase;
    }
    .rounded {
      border-top: 8px solid #bbb;
      width: 5rem;
    }
    .cast {
      margin-top: 3rem;
      margin-bottom: 2rem;
      column-gap: 3px;
      .cast-box {
        position: relative;
        width: 270px; 
        .cast-img {
          width: 270px;
        }
        .cast-name {
          position: absolute;
          width: 270px;
          bottom: 0px;
          padding: 10px;
          background-color: rgb(26 17 17 / 83%);
          span {
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5;
            letter-spacing: 0.00938em;
            text-align: left;
          }
        }
      }
    }
  }
`;
