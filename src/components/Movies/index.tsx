import React from "react";
import { Movie } from "../../store/movie";

import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";
import Box from "@material-ui/core/Box";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import MovieCard from "../MovieCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const InputWrapper = styled("div")`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled("ul")`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

interface CharactersProps {
  count: number;
  movies: Movie[];
  onCurrentPage: CallableFunction;
  currentPage: number;
  getRootProps: CallableFunction;
  getInputProps: CallableFunction;
  getTagProps: CallableFunction;
  getListboxProps: CallableFunction;
  getOptionProps: CallableFunction;
  groupedOptions: GenreOptionType[];
  value: GenreOptionType[];
  focused: boolean;
  genres: any;
  isLoadingGenres: boolean;
  setAnchorEl: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}

export interface GenreOptionType {
  id: number;
  name: string;
}

const Movies: React.FC<CharactersProps> = ({
  count,
  movies,
  onCurrentPage,
  currentPage,
  getRootProps,
  getInputProps,
  getTagProps,
  getListboxProps,
  getOptionProps,
  groupedOptions,
  value,
  focused,
  setAnchorEl,
  genres,
  isLoadingGenres,
}) => {
  const classes = useStyles();

  const handleChangePage = (event: any, page: number) => {
    onCurrentPage(page);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" width={1}>
        <NoSsr>
          <div>
            <div {...getRootProps()}>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option: GenreOptionType, index: number) => (
                  <Tag label={option.name} {...getTagProps({ index })} />
                ))}
                <input {...getInputProps()} />
              </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option: GenreOptionType, index: number) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option.name}</span>
                    <CheckIcon fontSize="small" />
                  </li>
                ))}
              </Listbox>
            ) : null}
          </div>
        </NoSsr>
      </Box>

      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          img={movie.poster_path}
          date={movie.release_date}
          genres={movie.genre_ids}
          genresHash={genres}
          isLoadingGenres={isLoadingGenres}
        />
      ))}
      <div className={classes.root}>
        <Pagination
          count={count}
          onChange={handleChangePage}
          page={currentPage}
        />
      </div>
    </>
  );
};

export default Movies;
