import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import useAutocomplete from "@material-ui/lab/useAutocomplete";
import Movies, { GenreOptionType } from "../../components/Movies";
import Loader from "../../components/UI/Loader";
import { getMovies, getGenres, Movie, filterMovies } from "../../store/movie";

interface RootState {
  movie: any;
}

const MovieContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [_movies, setMovies] = useState<Movie[]>([]);
  const [_genres, setGenres] = useState<GenreOptionType[]>([]);
  const [_moviesInfo, setMoviesInfo] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isLoading, movies, moviesInfo, genres, isLoadingGenres } = useSelector(
    (state: RootState) => state.movie,
    shallowEqual
  );

  useEffect(() => {
    if (_moviesInfo) setCount(Math.floor(_moviesInfo / itemsPerPage));
  }, [_moviesInfo]);

  useEffect(() => {
    dispatch(getMovies(currentPage));
    dispatch(getGenres(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (movies) {
      const sortedMovies = movies
        .slice()
        .sort(
          (a: Movie, b: Movie) =>
            (moment(b.release_date).format("YYYYMMDD") as any) -
            (moment(a.release_date).format("YYYYMMDD") as any)
        );
      setMovies(sortedMovies);
    }
    if (moviesInfo) setMoviesInfo(moviesInfo);
    if (genres) {
      const genresHash: any = {};
      genres.forEach((genre: GenreOptionType) => genresHash[genre.id] = genre.name);
      setGenres(genresHash);
    }
  }, [movies, moviesInfo, genres]);
  

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: _genres,
    getOptionLabel: (option) => option.name,
  });

  useEffect(() => {
    const ids = value.map((genre: GenreOptionType) => genre.id);
    dispatch(filterMovies(ids));
  }, [dispatch, value])  

  return (isLoading && isLoadingGenres) ? (
    <Loader />
  ) : (
    <Movies
      count={count}
      movies={_movies}
      onCurrentPage={setCurrentPage}
      currentPage={currentPage}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      getTagProps={getTagProps}
      getListboxProps={getListboxProps}
      getOptionProps={getOptionProps}
      groupedOptions={groupedOptions}
      value={value}
      focused={focused}
      setAnchorEl={setAnchorEl}
      genres={_genres}
      isLoadingGenres={isLoadingGenres}
    />
  );
};

export default MovieContainer;
