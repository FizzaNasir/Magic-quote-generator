import React from 'react'
import {red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { DeleteQuote } from '../../Features/QuoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import { AddLike, RemoveLike } from '../../Features/QuoteLikeSlice';
import { nanoid } from '@reduxjs/toolkit';
import {Typography,Chip, List,
   ListItemButton, ListItemIcon, ListItemText, ListItem, Card, CardHeader, 
   CardContent,CardActions, Avatar, IconButton, Popover, Stack} from '@mui/material';
import AddComment from '../Comments/AddComment';
import ModalComponent from '../Home/ModalComponent';
import ListItemComponent from '../ListItemComponent';
const LOGGED_IN_USERID = localStorage.getItem('loginUserId')

const QuoteCard = ({id, quote, author, dateCreated, timeCreated, tags}) => {
   

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [like, setLike] = React.useState(false);
    const [disLike, setDisLike] = React.useState(false);
    const [isLikeClick, setIsLikeClick] = React.useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [openCommentModal, setOpenCommentModal] = React.useState(false);
    const handleCommentModalOpen = () => setOpenCommentModal(true);
    const handleCommentModalClose = () => setOpenCommentModal(false);
    
    const QuoteLikes = useSelector((state)=>state.QuoteLikes.LikesArray)

    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const id2 = open ? 'simple-popover' : undefined;

    const tagsPerQuote = tags.map((tag)=><Chip size="small" label={tag.title} />)
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
   
    const handleLike = () =>{
      setIsLikeClick(true)
      setLike(prevState=> !prevState)
    }

    const handleDisLike = () =>{
      setLike(false)
      setDisLike(prevState=> !prevState)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      const likesForQuote = QuoteLikes.filter((like) => like.quoteId === id);
      setLikesCount(likesForQuote.length);
    }, [QuoteLikes, id]);

    useEffect(() => {
      if(like){
        const isLikeExist = QuoteLikes.find(el => (el.userId === LOGGED_IN_USERID && el.quoteId === id))
        if(!isLikeExist) {
        dispatch(AddLike({id: nanoid(), userId: LOGGED_IN_USERID, quoteId: id}))}
     
      }
      if(isLikeClick && !like){
        dispatch(RemoveLike({userId: LOGGED_IN_USERID, quoteId: id}))
      }

      return ()=>{
        setIsLikeClick(false)
      }
    }, [like])
    
    function onDeleteClickHandler(id){
      dispatch(DeleteQuote(id))
    }

    const listItemData = [
      {
        onClick: null,
        primary: "Report"
      },
      {
        onClick: onDeleteClickHandler(id),
        primary: "Delete"
      }
    ];
  
return (
<>
   <ModalComponent onHandleClose={handleCommentModalClose} open={openCommentModal} content= {<AddComment quoteId={id} onModalClose={handleCommentModalClose}/>}/>
        <Popover
        id={id2}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {
            listItemData.map(item => (
              <ListItemComponent
                  onClick={item.onClick}   
                  primary={item.primary}
              />
            ))
          }
       {/* <ListItem disablePadding 
       >
         <ListItemButton>
           <ListItemIcon>
           </ListItemIcon>
           <ListItemText primary='Report' />
         </ListItemButton>
       </ListItem>

       <ListItem disablePadding>
         <ListItemButton>
           <ListItemIcon>
           </ListItemIcon>
           <ListItemText
            onClick={()=>onDeleteClickHandler(id)}
            primary='Delete' />
         </ListItemButton>
       </ListItem> */}
       </List>
      </Popover>

        <Card sx={{width: 600, maxWidth: 600 , mb: 10}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
             
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClick}/>
              </IconButton>
            }
            title={author}
            subheader={`${dateCreated} ${timeCreated}`} 
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {quote}
            </Typography>
          </CardContent>
         <CardActions disableSpacing>

            <IconButton aria-label="Likes" style={{color: like && 'blue'}} onClick={handleLike}>
             <ThumbUpIcon /> 
             <p style={{fontSize: 20, padding: 3}}>|</p> 
             <p style={{fontSize: 17}}> {likesCount} </p> 
            </IconButton>

            <IconButton aria-label="Dislikes"  style={{color: disLike && 'red'}} onClick={handleDisLike}>
            <ThumbDownIcon />
            <p style={{fontSize: 20, padding: 3}}> |</p> 
            <p style={{fontSize: 17}}>4</p> 
            </IconButton>

            <IconButton aria-label="Comments">
              <ChatBubbleOutlineIcon onClick={handleCommentModalOpen}/>
            </IconButton> 
          </CardActions>
          
          <Stack direction="row" spacing={1} flexWrap={'wrap'} pt={3} mb={3} ml={2}>
          {tagsPerQuote}
        </Stack>
        </Card>
        </>
      );
    }
export default QuoteCard