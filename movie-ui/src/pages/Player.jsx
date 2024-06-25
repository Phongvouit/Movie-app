import React, {useState, useEffect} from "react";
import styled from "styled-components";
import video from "../assets/ATLAS - Official Teaser - Netflix.mp4";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../utils/constants";

export default function Player() {
  const navigate = useNavigate();
  const params = useParams()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchVideoMovie() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}`
      );
      setVideos(data.results);
    }
    fetchVideoMovie();
  }, [params.id]);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <YouTube className="video" videoId={videos[0]?.key}></YouTube>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100%;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
