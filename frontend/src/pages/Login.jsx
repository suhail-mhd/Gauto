import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";

const theme = createTheme();

//modal style of login with otp

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

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mobNumber, setMobNumber] = useState();
  const [otp, setOtp] = useState();
  const [otpstatus, setOtpStatus] = useState();
  const [loginDataByOtp, setLoginDataByOtp] = useState({});
  const [otpnumbererror, setOtpNumberError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  // Modal state and function
  const [modalOpen, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [OtpModal, setOtpModal] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const submitHandle = async (data) => {
    // setLoading(true)
    console.log(data);

    const { email, password } = data;

    // console.log(email);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data, status } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      //    setLoading(false)
      navigate("/");
    } catch (error) {
      // setLoading(false)
      console.log(error);
      setError("Invalid Login Access!");
    }
  };

  // sending otp MobNumber

  const LoginWithOtpHandle = (data) => {
    // e.preventDefault()
    // console.log(data);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios.post("/api/user/otpnumber", { mobNumber }, config).then((res) => {
        console.log(res);
      });

      setOpenModal(false);
      setOtpModal(true);
    } catch (error) {
      console.log(error);
      setOtpNumberError(true);
      setOtpModal(false);
    }
  };

  // validatinf the otp
  const otpValidate = (e) => {
    e.preventDefault();
    //   setLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .post("/api/user/otpvalidate", { otp, mobNumber }, config)
        .then((res) => {
          // console.log(res.data.res.status);
          // console.log(res.data);
          setLoginDataByOtp(res.data);
          setOtpStatus(res.data.res.status);
        });

      if (otpstatus === "approved") {
        localStorage.setItem("userInfo", JSON.stringify(loginDataByOtp));
        navigate("/");
      } else {
        navigate("/login");
      }

      setOpenModal(false);
      setOtpModal(true);
      //   setLoading(false)
    } catch (error) {
      // setLoading(false)
      console.log(error);
      setOtpNumberError(true);
      setOtpModal(false);
    }
  };

  const otpModalClose = () => {
    setOtpModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ marginBottom: "3rem" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitHandle)}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "This is not a valid email",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email && errors.email.message}
            </p>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password && errors.password.message}
            </p>

            <Typography style={{ textAlign: "center" }}>
              <Button onClick={handleOpen}>Login With Otp</Button>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                sx={{ textAlign: "center" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {otpnumbererror
                  ? "Your Number is not registerd"
                  : "Enter your Mobile Number"}
              </Typography>
              <form onSubmit={handleSubmit2(LoginWithOtpHandle)}>
                <p
                  style={{
                    color: "red",
                    fontSize: "19px",
                    textAlign: "center",
                  }}
                >
                  {errors2.phone && errors2.phone.message}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    name="phone"
                    {...register2("phone", {
                      required: "Mobile number is required",
                      minLength: { value: 10, message: "minimun length is 10" },
                      maxLength: { value: 10, message: "Maximun length is 10" },
                    })}
                    style={{
                      width: 200,
                      height: 50,
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                    onChange={(e) => setMobNumber(e.target.value)}
                  />
                  {/* <input value='Submit' type='submit' /> */}
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Button
                    style={{ height: 40, width: 100 }}
                    variant="outlined"
                    type="submit"
                  >
                    LogIn
                  </Button>
                </div>
              </form>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
            </Box>
          </Modal>

          <Modal
            open={OtpModal}
            onClose={otpModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button onClick={otpModalClose}>
                {" "}
                <ClearIcon />
              </Button>
              <Typography
                sx={{ textAlign: "center" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Enter Your Otp Number
              </Typography>
              <form onSubmit={otpValidate}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="number"
                    placeholder="Otp Number"
                    required
                    style={{
                      width: 200,
                      height: 50,
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Button
                    style={{ height: 40, width: 100 }}
                    variant="outlined"
                    type="submit"
                  >
                    Verify
                  </Button>
                </div>
              </form>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
            </Box>
          </Modal>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
