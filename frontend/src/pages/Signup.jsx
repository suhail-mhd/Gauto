import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  // const classes = useStyle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    event.preventDefault();
    setGender(event.target.value);
  };
  const handleChange3 = (event) => {
    event.preventDefault();
    setDistrict(event.target.value);
  };

  const submitHandle = async (data) => {
    const { name, email, password, confirmPassword, address, phone } = data;

    if (password !== confirmPassword) {
      setError("Password Not Matching");
    } else {
      //   setLoading(true)
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data, status } = await axios.post(
          "/api/user/signup",
          {
            name,
            email,
            phone,
            address,
            password,
            age,
            gender,
            district,
          },
          config
        );

        console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));
        //    setLoading(false)
        navigate("/");
      } catch (error) {
        console.log(error);
        //  setLoading(false)
        setError("Cannot use the existed data(email,phone)");
      }
    }
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitHandle)}
            sx={{ mt: 3 }}
          >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  variant="standard"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "minimum length is 2" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.name && errors.name.message}
                </p>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "This is not a valid email",
                    },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.email && errors.email.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: "6", message: "Minimum limit is 6" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.password && errors.password.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  fullWidth
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required",
                    minLength: { value: "6", message: "Minimum limit is 6" },
                  })}
                  // onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="standard"
                  label="Phone"
                  placeholder="Enter Phone"
                  type="number"
                  name="phone"
                  fullWidth
                  // onChange={(e)=>setPhone(e.target.value)}
                  {...register("phone", {
                    required: "Number is required",
                    minLength: {
                      value: "10",
                      message: "Phone Number requires 10 digits",
                    },
                    maxLength: {
                      value: "10",
                      message: "maximum length is 10 digit",
                    },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.phone && errors.phone.message}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Address"
                  placeholder="Enter Your Address"
                  type="text"
                  name="address"
                  fullWidth
                  {...register("address", { required: "Address is requires" })}
                  // onChange={(e)=>setAddress(e.target.value)}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.address && errors.address.message}
                </p>
              </Grid>
              <Grid container spacing={2}>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel htmlFor="demo-customized-select-native">
                    Age
                  </InputLabel>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <option aria-label="None" value="" />
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                    <option>32</option>
                    <option>33</option>
                    <option>34</option>
                    <option>35</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                  </NativeSelect>
                </FormControl>

                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel htmlFor="demo-customized-select-native">
                    Gender
                  </InputLabel>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={gender}
                    onChange={handleChange2}
                    label="gender"
                  >
                    <option aria-label="None" value="" />
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </NativeSelect>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel htmlFor="demo-customized-select-native">
                    District
                  </InputLabel>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={district}
                    onChange={handleChange3}
                    label="district"
                  >
                    <option aria-label="None" value="" />
                    <option>Kottayam</option>
                    <option>Ernakulam</option>
                    <option>Kozhikode</option>
                    <option>Idukki</option>
                    <option>Malappuram</option>
                    <option>kannu</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
