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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home,
  People as Users,
  Description as FileText,
  Event as Calendar,
  Settings,
  Message as MessageSquare,
  Assignment as ClipboardList,
  NoteAdd as FileSignature,
  PersonAdd as UserPlus,
  Inventory as Package,
  AccessTime as Clock,
  CloudUpload as Upload,
  Star,
  Group,
  Person,
  Notifications,
  Mail,
  MenuBook as Book,
} from '@mui/icons-material';

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

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, link: "/" },
  { id: 2, label: "Users", icon: Users, link: "/users" },
  { id: 3, label: "Projects", icon: FileText, link: "/projects" },
  { id: 4, label: "Schedule", icon: Calendar, link: "/schedule" },
  { id: 5, label: "Feedback", icon: MessageSquare, link: "/feedback-submission" },
  { id: 6, label: "Progress Report", icon: ClipboardList, link: "/progress-report" },
  { id: 7, label: "Project Proposal", icon: FileSignature, link: "/project-proposal" },
  { id: 8, label: "Register", icon: UserPlus, link: "/register" },
  { id: 9, label: "Resource Request", icon: Package, link: "/resource-request" },
  { id: 10, label: "Schedule Management", icon: Clock, link: "/schedule-management" },
  { id: 11, label: "Submit Project", icon: Upload, link: "/submit-project" },
  { id: 12, label: "Teacher Evaluation", icon: Star, link: "/teacher-evaluation" },
  { id: 13, label: "Team Formation", icon: Group, link: "/team-formation" },
  { id: 14, label: "User Profile", icon: Person, link: "/user-profile" },
  { id: 15, label: "Notifications", icon: Notifications, link: "/notifications" },
  { id: 16, label: "Contact", icon: Mail, link: "/contact" },
  { id: 17, label: "PFE Selection", icon: Book, link: "/pfe-selection" },
  { id: 18, label: "Settings", icon: Settings, link: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
        PFE Platform
      </Typography>
      <Divider />
      <List>
        {menuItems.map(({ id, label, icon: Icon, link }) => (
          <StyledListItemButton
            key={id}
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
    </StyledDrawer>
  );
}

