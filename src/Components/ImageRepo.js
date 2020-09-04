import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ImageIcon from '@material-ui/icons/Image';
import TextField from '@material-ui/core/TextField';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/firestore";
import { createWorker } from 'tesseract.js';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';
import '../Image.css';
import Card from './Card';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  paper: {
    // height: 140,
    width: 300,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(()=>console.log(data),[data]);
  
  //load user data after component loads
  useEffect(()=>{
    var db = firebase.firestore();
    var userId=firebase.auth().currentUser.uid;
    db.collection("images").doc(userId).get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          var tempCategories = [];
          for(var i=0;i<doc.data().img.length;i++)
          {
            tempCategories=tempCategories.concat(doc.data().img[i].predictions.split(', '));
          }
          setCategories(tempCategories);
          setData(doc.data().img);
      } else {
          console.log("No such document!");
          var userId=firebase.auth().currentUser.uid;
          db.collection("images").doc(userId).set({
            img: ""
          }).then(function() {
            db.collection("images").doc(userId)
            .onSnapshot(function(doc) {
              var tempCategories = [];
              for(var i=0;i<doc.data().img.length;i++)
              {
                tempCategories=tempCategories.concat(doc.data().img[i].predictions.split(', '));
              }
              setCategories(tempCategories);
              setData(doc.data().img);
            });
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
},[]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="Image Categories" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem button key={text} onClick={()=>{document.getElementById("search").value=text;document.getElementById("search").focus();search(text)}}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

function uploadData(url, file, text, predictions)
{
  console.log(url);console.log(text);console.log(predictions);
  var str=predictions[0].className;
  for(var i=1;i<predictions.length;i++)
  str=str+", "+ predictions[i].className;
  var d = new Date();
  var m=d.getMonth()+1;
  d = d.getDate()+"-"+m+"-"+d.getFullYear();
  const temp={
    url: url,
    text: text,
    predictions: str,
    name: file.name,
    date: d
  };
  const tempData=[...data];
  tempData.push(temp);
  setData(tempData);
  var db = firebase.firestore();
  var userId=firebase.auth().currentUser.uid;
  db.collection("images").doc(userId).set({
    img: tempData
  }).then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

}

function search(text)
{
  // console.log(text);
  var docs=document.getElementsByClassName("metadatasearch");
  var holder=document.getElementsByClassName("metadataholder");
  // console.log(docs);
  for(var i=0;i<docs.length;i++)
  {
    var txtValue = docs[i].textContent || docs[i].innerText;
    if (txtValue.toLowerCase().includes(text) ) {
      holder[i].style.display = "";
    } else {
      holder[i].style.display = "none";
    }
  }
}

function ocr(url, file)
{
    console.log("hi from ocr()");
    const worker = createWorker({
    // logger: m => console.log(m)
    });

    (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(url);
    // console.log(text);
    await worker.terminate();
    label(url, file, text);
    })();
}

async function label(url, file, text) 
{
  console.log("hi from label()");
  //convert a fFile() to Image() for Tensorflow JS
  var ur = URL.createObjectURL(file),img = new Image();                         
  img.onload = function() {                    
      URL.revokeObjectURL(this.src);             
    };
  img.src = ur;  
  const model = await mobilenet.load();

// Classify the image.
const predictions = await model.classify(img);
// console.log(predictions);
uploadData(url, file, text, predictions);

}

function uploadFile(file)
{
    var userId=firebase.auth().currentUser.uid;
    var storageRef = firebase.storage().ref();
    var ImageRef = storageRef.child(userId+'/'+file.name);
    ImageRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
        ImageRef.getDownloadURL().then(function(url){
            console.log(url);
            ocr(url,file);
        })
      });
}

function selectFiles()
{
    var files = document.getElementById("selectFiles").files;
    for(var i=0;i<files.length;i++)
    {
        uploadFile(files[i]);
    }
}

function signOut()
{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Image Repository
          </Typography>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{firebase.auth().currentUser.email}</MenuItem>
                <MenuItem onClick={signOut} >Sign Out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>

          <Paper>
          <div >
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <ImageSearchIcon />
              </Grid>
              <Grid item>
                <TextField id="search" label="Please enter a search query" style={{width: "500px"}} onKeyUp={event=>search(event.target.value)} />
              </Grid>
            </Grid>
          </div>
        
          </Paper>  
          <br/><br/>          
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  {
                  data.length?
                  data.map((inputfield, index) => (
                    <Grid key={index} item className="metadataholder">
                      <Paper className={classes.paper} >
                        <Card name={inputfield.name} url={inputfield.url} date={inputfield.date} predictions={inputfield.predictions} text={inputfield.text} />
                      </Paper >
                    </Grid>
                  ))
                  : <p>No Images found</p>
                }
                </Grid>
              </Grid>
            

        <input type="file" id="selectFiles" multiple accept="image/png, image/jpeg, image/svg, image/jpg" style={{display: "none"}} onChange={()=>selectFiles(this)} />
            
        <Fab color="primary" aria-label="add" id="upload" onClick={()=>{document.getElementById("selectFiles").click()}}>
            <CloudUploadIcon /> 
        </Fab>        
      </Typography>
      </main>
    </div>
  );
};


