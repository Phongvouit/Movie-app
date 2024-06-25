import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <p>&#169; CarpoolVenom All Right Reserved</p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: rgb(19, 19, 19);
`;
