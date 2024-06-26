import React, { useState, useEffect } from "react";
import styled from "styled-components";
import video from "../assets/ATLAS - Official Teaser - Netflix.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import {onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from './../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_API } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { removeMovieFromLiked, getUserLikedMovies } from "../store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import favoriteUtils from "../utils/favorite-utils";
import { routesGen } from "../routes/route";
import { API_KEY } from "../utils/constants";

export default React.memo(function Card({ movieData, mediaType = "movies"}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const listFavorites = useSelector((state) => state.movie.listFavorites);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined)

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) {
      setEmail(currentUser.email)
    } else navigate("/login")
  })

  const addToList = async () => {
    try {
      await axios.post(`${REACT_APP_API}/api/user/add`, {
        email,
        data: movieData
      })
      toast.success("Add favorite movie successfully")
      console.log(movieData.id)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromList = () => {
    dispatch(
      removeMovieFromLiked({email,  movieId: movieData.id})
    )
    toast.success("Remove favorite movie successfully")
  }

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  const handleDetailMovie = () => {
    navigate(routesGen.mediaDetail(mediaType, movieData.id))
  }


 
  

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDetailMovie}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
            />
            <video src={video} autoPlay={true} loop muted />
          </div>
          <div className="info-container flex column">
            <h3>{movieData.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp />
                <RiThumbUpFill />
                <RiThumbDownFill />
                {favoriteUtils({listFavorites, movieId: movieData.id}) ? (
                  <BsCheck 
                  title="Remove from List"
                  onClick={removeFromList}
                  />
                  ) : (
                  <AiOutlinePlus title="Add movie to my list" onClick={addToList}/>
                  )}
              </div>
              <div className="info">
                <BiChevronDown />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});
const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      .icons {
        .controls {
          gap: 1rem;
        }
        svg {
          font-size: 2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }
        }
      }
      .genres {
        ul {
          gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }
`;
