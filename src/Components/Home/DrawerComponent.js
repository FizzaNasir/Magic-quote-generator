import React from 'react'
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ModalComponent from './ModalComponent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AvailableTags from '../../AvailableTags';
import { useNavigate } from 'react-router-dom';
import ListItemComponent from '../ListItemComponent';

const alltags = AvailableTags;

const DrawerComponent = ({ onHandleOpen, onHandleClose, open, filteredByTags }) => {
  const navigate = useNavigate();

  const listItemData = [
    {
      onClick: null,
      icon: <SearchIcon />,
      primary: "Search"
    },
    {
      onClick: onHandleOpen,
      icon: <AddBoxIcon />,
      primary: "Create"
    },
    {
      onClick: handleClick,
      icon: <BookmarkIcon />,
      withTreeView: true
    },
    {
      onClick: onSignOutHandler,
      icon: <ExitToAppIcon />,
      primary: "Sign Out"
    }
  ];

  function handleClick(event, nodeId) {
    if (nodeId !== 'Tags') {
      filteredByTags(nodeId);
    }
  }

  function onSignOutHandler() {
    localStorage.removeItem('loginUserId');
    navigate('/Login');
  }

  return (
    <div>
      <ModalComponent open={open} onHandleClose={onHandleClose} />

      <Toolbar sx={{ mt: 10, mb: 5 }}>
        <Typography variant="h6" Wrap component="div">
          Magic Quote Generator
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {listItemData.map((item, index) => (
          <div key={index}>
            {!item.withTreeView &&
            <ListItemComponent
              onClick={item.onClick}
              icon={item.icon}
              primary={item.primary}
            />}
            {item.withTreeView && (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <Box sx={{ flexGrow: 1 }}>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      onNodeSelect={handleClick}
                    >
                      <TreeItem nodeId="Tags" label="Tags">
                        {alltags.map((treeItem, index) => (
                          <TreeItem
                            key={treeItem.label}
                            nodeId={treeItem.label}
                            label={treeItem.label}
                          />
                        ))}
                      </TreeItem>
                    </TreeView>
                  </Box>
                </ListItemButton>
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </div>
  );
};

export default DrawerComponent;
