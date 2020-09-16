import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CakeIcon from "@material-ui/icons/Cake";
import Avatar from "@material-ui/core/Avatar";
import WcIcon from "@material-ui/icons/Wc";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import {
  Divider,
  Grid,
  Drawer,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import FileSaver from "file-saver";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
    textAlign: `left`,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  listText: {
    padding: theme.spacing(0, 7, 0),
    textAlign: `left`,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  drawer: {
    width: 500,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 500,
  },
  drawerContainer: {
    overflow: `auto`,
    margin: `auto`,
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(3),
    width: `500vh`,
  },
  picture: {},
}));

export default function DataComponent(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log(`props changed`, props.data);
  }, [props.data]);

  const saveToFile = (data) => {
    var blob = new Blob([JSON.stringify(data)], {
      type: `text/plain;charset=utf-8`,
    });
    FileSaver.saveAs(blob, `data_file.json`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant={`permanent`}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Grid container spacing={0} justify={`center`}>
            <Avatar alt={`Profile Picture`} src={props.data.picture.data.url} />
          </Grid>
          <Grid container spacing={0} justify={`center`}>
            <Typography className={classes.text} variant={`h5`} gutterBottom>
              {props.data.first_name} {props.data.last_name}
            </Typography>
          </Grid>
          <React.Fragment>
            <ListItem button>
              <ListItemAvatar>
                <CakeIcon />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.birthday}
                secondary={`Date of birth`}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <WcIcon />
              </ListItemAvatar>
              <ListItemText primary={props.data.gender} secondary={`Gender`} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <MailOutlineIcon />
              </ListItemAvatar>
              <ListItemText primary={props.data.email} secondary={`Email`} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <HomeIcon />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.hometown.name}
                secondary={`Hometown`}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <PeopleIcon />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.friends.summary.total_count}
                secondary={`Number of friends`}
              />
            </ListItem>
          </React.Fragment>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography className={classes.text} variant={`h6`} gutterBottom>
          Top feed posts by {props.data.first_name} {props.data.last_name}
        </Typography>
        <Divider />
        <List className={classes.list}>
          {props.data.feed.data.map(
            ({ id, message, created_time, story }, i) => (
              <React.Fragment>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Profile Picture`}
                      src={props.data.picture.data.url}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${props.data.first_name} ${props.data.last_name}`}
                    secondary={created_time}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.listText}
                    primary={message ? message : `No description available`}
                    secondary={`Description`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge={`end`}
                      aria-label={`delete`}
                      onClick={() => {
                        props.deleteUserPost(i);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          )}
        </List>
        <Button
          variant={`outlined`}
          color={`primary`}
          onClick={() => saveToFile(props.data.feed.data)}
        >
          Save changes
        </Button>
      </main>
    </div>
  );
}
