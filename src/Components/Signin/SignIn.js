import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import TemplateFrame from "./TemplateFrame";
import getSignUpTheme from "./theme/getSignUpTheme";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ENDPOINTS } from "../../shared/constants";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  textAlign: "left",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  // opacity: .2,
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignIn() {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  createTheme(getSignUpTheme(mode));
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [isFirstTimeUser, setFirstTimeUser] = React.useState(false);
  const navigate = useNavigate();
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage‚
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);
  React.useEffect(() => {
    setEmailError(false);
    setPasswordError(false);
    setPasswordErrorMessage("");
    setEmailErrorMessage("");
    setNameError(false);
    setNameErrorMessage("");
    if (isFirstTimeUser) {
      setEmail("");
      setPass("");
      setName("");
    }
  }, [isFirstTimeUser]);

  const handleSignUp = () => {
    fetch(`${BASE_URL}${ENDPOINTS.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        pass: pass,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setFirstTimeUser((prev) => !prev);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const validateInputs = () => {
    let isInputValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isInputValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!pass || pass.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isInputValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isFirstTimeUser && (!name || name.length < 1)) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isInputValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (isInputValid) {
      if (isFirstTimeUser) {
        handleSignUp();
      } else {
        handleSignIn();
      }
    }
  };

  const handleSignIn = () => {
    const queryParams = new URLSearchParams({
      email: email,
      password: pass,
      name: name,
    }).toString();

    fetch(`${BASE_URL}${ENDPOINTS.user}?${queryParams}`, {
      method: "GET",
      headers: {
        // Authorization: "Bearer yourTokenHere",
      },
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data);
        if (data && data.email) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("pass", data.password);
          localStorage.setItem("name", data.name);
          navigate("/");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <TemplateFrame mode={mode}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: "left",
              height: "100dvh",
              p: 2,
            }}
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                {isFirstTimeUser ? "Sign up" : "Sign in"}
              </Typography>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {isFirstTimeUser ? (
                  <FormControl>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      value={name}
                      id="name"
                      placeholder="Full name"
                      error={nameError}
                      helperText={nameErrorMessage}
                      color={nameError ? "error" : "primary"}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                ) : (
                  ""
                )}

                <FormControl>
                  {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={email}
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={passwordError ? "error" : "primary"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={pass}
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? "error" : "primary"}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </FormControl>
                {isFirstTimeUser ? (
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive updates via email."
                  />
                ) : (
                  ""
                )}
                <Button fullWidth variant="contained" onClick={validateInputs}>
                  {isFirstTimeUser ? "Sign up" : "Sign in"}
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                  {isFirstTimeUser
                    ? `Already have an account?${" "}`
                    : `New to Netflix?${" "}`}
                  <span>
                    <Link
                      // href="/sign-up"
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                      // onClick={toogleLoginForm}
                      onClick={() => {
                        setFirstTimeUser((prevState) => !prevState);
                      }}
                    >
                      {isFirstTimeUser ? "Sign in now" : "Sign up now"}
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
