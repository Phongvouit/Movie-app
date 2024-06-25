import React, { useState } from "react";
import styled from "styled-components";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <input type="checkbox" id="sidebar-active" />
        <label for="sidebar-active">
          <IoIosMenu />
        </label>
        <div className="logo-reponsive">
          <p>
            Moon
            <span>Flix</span>
          </p>
        </div>
        <div className="left flex a-center">
          {/* <div className="logo">
            <p>
              Moon
              <span>Flix</span>
            </p>
          </div> */}
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className="search">
            <button onClick={() => navigate("/search")}>
              <FaSearch />
            </button>
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
 .scrolled {
    background-color: rgb(19, 19, 19);
  }
  nav {
    position: sticky;
    top: 0;
    width: 100%;
    height: 6.5rem;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    @media screen and (max-width: 640px) {
      height: 4rem;
      padding: 0 1rem;
    }
    #sidebar-active {
      display: none;
      &:checked ~ .left {
        display: flex;
      }
    }
    label {
      display: none;
      @media screen and (max-width: 640px) {
        display: block;
        height: 4rem;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        svg {
          color: #f34242;
          font-size: 2rem;
        }
      }
    }
    .logo-reponsive {
      p {
          line-height: 1.5;
          letter-spacing: 0.00938em;
          font-weight: 700;
          font-size: 1.7rem;
          color: white;
          span {
            color: rgb(255, 0, 0);
          }
      }
      
      @media screen and (max-width: 640px) {
          display: block;
      }
    }
    .left {
      @media screen and (max-width: 640px) {
        display: none;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 4rem;
        left: 0;
        z-index: 10;
        width: 300px;
        height: 100%;
        padding: 2rem;
        background-color: rgb(19, 19, 19);
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        @media screen and (max-width: 640px) {
          flex-direction: column;
        }
        li {
          a {
            color: white;
            text-decoration: none;
            &:hover {
              color: rgb(255, 0, 0);
            }
          }
        }
      }
    }
    .right {
      gap: 1rem;
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
      }
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
    }
  }
`;
