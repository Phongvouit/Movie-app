import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_KEY, REACT_APP_API, TMBD_BASE_URL } from "./../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  listFavorites: []
};

export const getGenres = createAsyncThunk("movie/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) {
        movieGenres.push(name.name);
      }
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "movie/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      movie: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "movie/trending",
  async ({ type }, thunkAPI) => {
    const {
      movie: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "movie/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`${REACT_APP_API}/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "movie/deleteLiked",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.put(`${REACT_APP_API}/api/user/remove`, {
      email,
      movieId,
    });
    return movies
  }
);

const MovieSlice = createSlice({
  name: "Movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.listFavorites = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.listFavorites = action.payload;
    })
  },
});

export const store = configureStore({
  reducer: {
    movie: MovieSlice.reducer,
  },
});
