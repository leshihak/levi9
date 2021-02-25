import { createSlice } from "@reduxjs/toolkit";
import { GenreOptionType } from "../components/Movies";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: any[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type MovieState = {
  movies: Movie[];
  moviesInfo: number | null;
  genres: GenreOptionType[];
  isLoading: boolean;
  isLoadingGenres: boolean;
  error: any;
};

const initialState: MovieState = {
  movies: [],
  moviesInfo: null,
  isLoading: false,
  isLoadingGenres: false,
  error: null,
  genres: [],
};

const { actions, reducer } = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesRequest(state) {
      state.isLoading = true;
    },

    getGenresRequest(state) {
      state.isLoadingGenres = true;
    },

    setMovies(state, action) {
      state.movies = action.payload;
      state.isLoading = false;
    },

    setGenres(state, action) {
      state.genres = action.payload;
      state.isLoadingGenres = false;
    },

    setMoviesInfo(state, action) {
      state.moviesInfo = action.payload;
      state.isLoading = false;
    },

    getMoviesFailed(state) {
      state.isLoading = false;
    },

    getGenresFailed(state) {
      state.isLoadingGenres = false;
    },

    getMoviesSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },

    getGenresSuccess(state) {
      state.isLoadingGenres = false;
      state.error = null;
    },
  },
});

export const {
  setMovies,
  setMoviesInfo,
  getMoviesRequest,
  getMoviesFailed,
  getMoviesSuccess,
  setGenres,
  getGenresSuccess,
  getGenresFailed,
  getGenresRequest,
} = actions;

export const getMovies = (page: number) => async (dispatch: any) => {
  try {
    dispatch(getMoviesRequest());
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=335257c904ec94cda81db164cc76b992&page=${page}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();

      dispatch(setMovies(data.results));
      dispatch(setMoviesInfo(data.total_pages));
    }

    dispatch(getMoviesSuccess());
  } catch (error) {
    dispatch(getMoviesFailed());
  }
};

export const getGenres = (page: number) => async (
  dispatch: any,
) => {
  try {
    dispatch(getGenresRequest());
    const url =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=335257c904ec94cda81db164cc76b992&language=en-US";
    const response = await fetch(url, {
      method: "GET",
    });
    await dispatch(getMovies(page));

    if (response) {
      const data = await response.json();

      dispatch(setGenres(data[Object.keys(data)[0]]));
    }

    dispatch(getGenresSuccess());
  } catch (error) {
    dispatch(getGenresFailed());
  }
};

export const filterMovies = (ids: number[]) => async (dispatch: any) => {
  const _ids = ids.map((el) => `${el},`);
  
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=335257c904ec94cda81db164cc76b992&with_genres=${_ids}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      
      dispatch(setMovies(data.results));
      dispatch(setMoviesInfo(data.total_pages));
    }
  } catch (error) {
    dispatch(getMoviesFailed());
  }
};

export default reducer;
