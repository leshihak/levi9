import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { GenreOptionType } from "../Movies";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface MovieCardProps {
  title: string;
  img: string;
  date: string;
  genres: number[];
  genresHash: any;
  isLoadingGenres: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  img,
  date,
  genres,
  genresHash,
  isLoadingGenres,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" mb={4}>
      <img alt={title} src={`https://image.tmdb.org/t/p/w200${img}`} />
      <Box ml={1}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {date}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {isLoadingGenres
            ? ""
            : genres.map((genre: number) => `${genresHash[genre]} `)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;
