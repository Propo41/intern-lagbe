import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { POST } from "../../api/api";
import errorHandling from "../../utils/error_handling";
import Alert from "../AlertCustom";

// ----------------------------------------------------------------------

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formik.values);
    try {
      const { data } = await POST("auth/user/login", {
        email: formik.values.email,
        password: formik.values.password,
      });
      console.log(data);
      if (data.statusCode === 200) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (e) {
      if (e.response) {
        setAlert(errorHandling(e));
      } else {
        console.log("server didnt respond");
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Login
        </LoadingButton>
        {alert && alert.status && (
          <Alert
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
          />
        )}
      </Form>
    </FormikProvider>
  );
};
export default LoginForm;
