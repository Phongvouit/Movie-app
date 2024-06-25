import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";

export default function MovieBox({movieData}) {
  return (
    <Container>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="box-img" />
      <div className="box-text">
        <h2 className="movie-title">{movieData?.name}</h2>
        <button className="flex j-center a-center">
          <FaPlay />
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
      transform: scale(1.1);
      transition: 0.5s;
    }
  }
  .box-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    row-gap: 1rem;
    padding: 14px;
    background: linear-gradient(
      8deg,
      hsl(240 17% 14% / 74%) 14%,
      hsl(240 17% 14% / 14%) 44%
    );
    overflow: hidden;
    .movie-title {
      font-size: 1.1rem;
      font-weight: 500;
    }
    button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: white;
      background-color: red;
      border: none;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
