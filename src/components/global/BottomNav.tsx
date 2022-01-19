import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Container, Paper } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} color='primary'>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
            // label="home" 
            value="home"
            icon={<HomeIcon />}
        />
        <BottomNavigationAction
            // label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
            // label="Chat"
            value="chat"
            icon={<AssistantIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
