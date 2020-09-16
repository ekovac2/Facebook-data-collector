import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import LoginComponent from "./LoginComponent";
import CardMedia from "@material-ui/core/CardMedia";
import DataComponent from "./DataComponent";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: `left`,
  },
  media: {
    minHeight: `100vh`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: `#92a7d3`,
  },
}));

export default function Start() {
  const classes = useStyles();
  const [loginStatus, setLoginStatus] = useState(false);
  const [fbData, setFbData] = useState({});

  const callback = (status, data) => {
    setLoginStatus(status);
    setFbData(data);
  };

  const deleteUserPost = (index) => {
    const listOfUserPosts = JSON.parse(JSON.stringify(fbData.feed.data));
    listOfUserPosts.splice(index, 1);

    var updatedFbData = JSON.parse(JSON.stringify(fbData));
    updatedFbData.feed.data = listOfUserPosts;
    
    setFbData(updatedFbData);
  };

  return (
    <div className={classes.root}>
      <AppBar position={`fixed`} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge={`start`}
            className={classes.menuButton}
            color={`inherit`}
            aria-label={`menu`}
          >
            <FacebookIcon />
          </IconButton>
          <Typography variant={`h5`} className={classes.title} >
            <Box fontWeight={`fontWeightBold`} fontFamily={`Monospace`} letterSpacing={6}>
              Facebook data collector
            </Box>
          </Typography>
          <LoginComponent parentCallback={callback} />
        </Toolbar>
      </AppBar>
      {loginStatus ? (
        <DataComponent data={fbData} deleteUserPost={deleteUserPost} />
      ) : (
        <CardMedia
          className={classes.media}
          image= {`https://i.pinimg.com/originals/b3/94/ad/b394ad64d91cb7b90d6818810e47cbd7.png`}
        >
        </CardMedia>
      )}
    </div>
  );
}
