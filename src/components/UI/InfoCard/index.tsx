import React from "react";

import { Card as CardItem } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    center: {
      maxWidth: 300,
      margin: "0 auto",
      paddingTop: 15,
    },
    img: {
      maxWidth: 270,
    },
    truncate: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  })
);

interface CharacterInfoCardProps {
  species: string;
  status: string;
  type: string;
  url: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  name: string;
}

const CharacterInfoCard: React.FC<CharacterInfoCardProps> = ({
  name,
  image,
  episode,
  gender,
  species,
  status,
  type,
  url,
  created,
}) => {
  const classes = useStyles();

  return (
    <CardItem className={classes.center}>
      <CardContent>
        <Typography color="textSecondary">Name: {name}</Typography>
        <img alt={`img ${name}`} src={image} className={classes.img} />
        <Typography variant="body2" component="p" className={classes.truncate}>
          Episodes: {episode.map((el: string) => el)}
        </Typography>
        <Typography variant="body2" component="p">
          Gender: {gender}
        </Typography>
        <Typography variant="body2" component="p">
          Species: {species}
        </Typography>
        <Typography variant="body2" component="p">
          Status: {status}
        </Typography>
        <Typography variant="body2" component="p">
          Type: {type}
        </Typography>
        <Typography variant="body2" component="p" className={classes.truncate}>
          URL: {url}
        </Typography>
        <Typography variant="body2" component="p">
          Created: {created}
        </Typography>
      </CardContent>
    </CardItem>
  );
};

export default CharacterInfoCard;
