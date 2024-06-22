import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const ListItemComponent = ({ onClick, icon, primary }) => {
    return (
      <ListItem disablePadding>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={primary} />
        </ListItemButton>
      </ListItem>
    );
  };
  

export default ListItemComponent;