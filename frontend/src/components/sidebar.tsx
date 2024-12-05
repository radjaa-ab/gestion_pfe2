import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Toolbar,
  Button as MuiButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';

// Styled Drawer for the Sidebar
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// Styled ListItemButton for Menu Items with hover and selected states
const StyledListItemButton = styled(ListItemButton)<{
  component?: React.ElementType;
  to?: string;
}>(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

interface MenuItem {
  label: string;
  icon: React.ElementType;
  link: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
        PFE Platform
      </Typography>
      <Divider />
      <List>
        {menuItems.map(({ label, icon: Icon, link }, index) => (
          <StyledListItemButton
            key={index}
            selected={location.pathname === link}
            component={RouterLink}
            to={link}
          >
            <ListItemIcon sx={{ color: 'primary.contrastText' }}>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </StyledListItemButton>
        ))}
      </List>
      <Divider />
      <div style={{ padding: '16px' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Logged in as: {user?.name} ({user?.role})
        </Typography>
        <MuiButton
          variant="outlined"
          fullWidth
          onClick={handleLogout}
          style={{ color: 'inherit', borderColor: 'inherit' }}
        >
          Logout
        </MuiButton>
      </div>
    </StyledDrawer>
  );
}

