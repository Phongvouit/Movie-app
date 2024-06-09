import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <p>
          Moon
          <span>Flix</span>
        </p>
      </div>
      <button>Sign In</button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  .logo {
    p {
      line-height: 1.5;
      letter-spacing: 0.00938em;
      font-weight: 700;
      font-size: 1.7rem;
      color: white;
    }
    span {
      color: rgb(255, 0, 0);
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
