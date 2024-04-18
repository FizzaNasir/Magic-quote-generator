import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react'
import { useSelector } from 'react-redux';

const CommentCard = ({userId, comment}) => {
  const Users = useSelector(state=>state.Users.UsersArray)

    function FindUserNameByID(){
    const found = Users.find(user=> user.id === userId)
    return found && found.username
  }
  
  return (
    <>
    <List   
    sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
      '& ul': { padding: 0 },
    }}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
       primary={
        <Typography
          variant="body1"
          fontWeight="bold" 
        >
           {FindUserNameByID()}
        </Typography>}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
             {comment}
            </Typography>
          </React.Fragment>
        }
      />
       </ListItem>
       </List>
       <Divider/>
       </>
  )
}

export default CommentCard
