import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

export default function BackgroundImage() {
  return (
    <Container>
      <img alt="background" src={background} />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  img {
    height: 100vh;
    width: 100%;
  }
`;
