import React, { useRef, useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = (props) => {
  const menuRef = useRef(null);
  const [logout, setLogout] = useState(false);
  const [userId, setUserId] = useState();
  const [adminLogout, setAdminLogout] = useState(false);
  const navigate = useNavigate();
  const loc = JSON.parse(localStorage.getItem("userInfo"));

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const data = () => {
    if (loc) {
      setUserId(loc._id);
    }
  };

  //   Logout handling
  const logoutHandle = () => {
    localStorage.removeItem("userInfo");
    setLogout(true);
    navigate("/");
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";


  useEffect(() => {
    console.log("rendered");
  }, [logout, adminLogout]);

  useEffect(() => {
    data();
  }, []);

  const adminLogoutHandle = () => {
    localStorage.removeItem("Admin");
    setAdminLogout(true);
    navigate("/admin");
  };

  return (
    <header className="header">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.admin ? (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              textAlign="center"
              component="h2"
            >
              Are you sure want to Logout
            </Typography>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button onClick={adminLogoutHandle}>Yes</Button>
              <Button onClick={() => setOpen(false)}>No</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              textAlign="center"
              component="h2"
            >
              Are you sure want to Logout
            </Typography>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button onClick={logoutHandle}>Yes</Button>
              <Button onClick={() => setOpen(false)}>No</Button>
            </Box>
          </Box>
        )}
      </Modal>

      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              {props.admin ? null : (
                <div className="header__top__left">
                  <span>Need Help?</span>
                  <span className="header__top__help">
                    <i class="ri-phone-fill"></i> +91 9526103163
                  </span>
                </div>
              )}
            </Col>

            {loc && !props.admin ? (
              <Col style={{ display: "flex" }}>
                <MenuItem onClick={()=>navigate(`/profile/${userId}`)} className="gap-1">Profile</MenuItem>
      <MenuItem onClick={()=>navigate('/bookinghistory')} className="gap-1">Booking History</MenuItem>
      <div style={{marginRight:10}}>
            
            <MenuItem sx={{color:'white'}} onClick={()=>navigate('/wishlist')}> Wishlist</MenuItem> </div>
                <MenuItem onClick={handleOpen} className="gap-1">
                  <i class="ri-logout-circle-line"></i> Logout
                </MenuItem>
                <h6
                  style={{
                    color: "white",
                    marginTop: "10px",
                    marginLeft: "1rem",
                  }}
                >
                  {" "}
                  Welcome {loc.name}
                </h6>
              </Col>
            ) : (
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link
                    to="/login"
                    className=" d-flex align-items-center gap-1"
                  >
                    <i class="ri-login-circle-line"></i> Login
                  </Link>

                  <Link
                    to="/signup"
                    className=" d-flex align-items-center gap-1"
                  >
                    <i class="ri-user-line"></i> Register
                  </Link>
                </div>
              </Col>
            )}

            <div style={{ display: "flex", justifyContent: "right" }}>
              {props.admin ? (
                <div style={{ marginRight: 10, marginTop: 14 }}>
                  {/* <h6> Welcome Admin</h6> */}
                  {/* <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
              }}
              animationType="blocks"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            > */}
                  Welcome Admin
                  {/* </AnimatedText> */}
                </div>
              ) : null}

              {props.admin ? (
                <Button
                  variant="h6"
                  onClick={handleOpen}
                  className="gap-1"
                  style={{ marginTop: "10px" }}
                >
                  <i class="ri-logout-circle-line"></i> Logout
                </Button>
              ) : null}
            </div>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img
                      src="../logo.png"
                      style={{ height: 50 }}
                      alt="Roadsters Logo"
                    />
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Ernakulam</h4>
                  <h6>Ernakulam City, Kochi</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>All day</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
