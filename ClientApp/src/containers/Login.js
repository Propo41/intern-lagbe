// material
import { styled } from "@material-ui/core/styles";
import { Card, Stack, Container, Typography } from "@material-ui/core";
// layouts
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import LoginForm from "../components/authentication";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "top",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Admin Panel
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your details below to enter the Admin panel of InternLagbe
            </Typography>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
