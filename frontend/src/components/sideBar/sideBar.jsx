import React ,{ useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AdminDashboard from '../../pages/adminDashboard/adminDashboard'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
// import UserManagement from '../../Pages/CarManagement/CarManagement'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { color } from '@mui/system';
const drawerWidth = 240;

function SideBar(props) {
  const [admin ,setAdmin] = useState(true)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dashboard,setDashboard] = useState(false)
  const [userManagement,setUserManagement] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dashboardHandle = () => {
    setDashboard(true)
    setUserManagement(false)
  }

  const userManagementHandle = () => {
    setUserManagement(true)
    setDashboard(false)
  }

  const drawer = (
    <div>
      
      <Toolbar  style={{backgroundColor:'#222222'}} />
      <Divider />
      <List>
            <Link to='/admin/dashboard' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button onClick={dashboardHandle}  >
            <ListItemIcon>
             <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
            <h6>Dashboard</h6>
            <ListItemText />
          </ListItem>
            </Link>
      </List>
      <Divider />
      <List>
            <Link to='/admin/userManagement' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button onClick={userManagementHandle} >
            <ListItemIcon>
             <PersonOutlinedIcon />
            </ListItemIcon>
            <h6>User Management</h6>
            <ListItemText />
          </ListItem>
            </Link>
      </List>
      <Divider />
      <List>
      <Link to='/admin/booking' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button >
            <ListItemIcon>
             <MenuBookOutlinedIcon />
            </ListItemIcon>
            <h6>Booking</h6>
            <ListItemText />
          </ListItem>
          </Link>
      </List>
      <Divider />
      {/* <List>
          <ListItem button >
            <ListItemIcon>
             <EditRoadOutlinedIcon />
            </ListItemIcon>
            <h6>Completed Trips</h6>
            <ListItemText />
          </ListItem>
      </List> */}
      <Divider />
      <List>
      <Link to='/admin/carManagement' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button >
            <ListItemIcon>
             <DirectionsCarFilledOutlinedIcon />
            </ListItemIcon>
            <h6>Car Management</h6>
            <ListItemText />
          </ListItem>
          </Link>
      </List>
      <Divider />
      <List>
      <Link to='/admin/coupon' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button >
            <ListItemIcon>
             <DiscountOutlinedIcon />
            </ListItemIcon>
            <h6>Manage Coupon</h6>
            <ListItemText />
          </ListItem>
          </Link>
      </List>
      <Divider />
      <Link to='/admin/offerManagement' style={{textDecoration:'none' ,color:'black'}} >
      <List>
          <ListItem button >
            <ListItemIcon>
             <CardMembershipOutlinedIcon />
            </ListItemIcon>
            <h6>Offer Management</h6>
            <ListItemText />
          </ListItem>
      </List>
      </Link>
      <Divider />
      <List>
        <Link to='/admin/districtManagement' style={{textDecoration:'none' ,color:'black'}} >
          <ListItem button >
            <ListItemIcon>
             <PublicOutlinedIcon />
            </ListItemIcon>
            <h6>District Management</h6>
            <ListItemText />
          </ListItem>
          </Link>
      </List>
      
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        
      >
          
          <Header admin={admin}  />
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

            
      </Box>
      {/* <Footer  admin={admin} /> */}
    </Box>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;