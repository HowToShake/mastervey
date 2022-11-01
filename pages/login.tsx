import { ReactElement, useEffect } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import {
  Card,
  CardActions,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { useAuth } from "@hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";

const schemaValidation = object().shape({
  email: string().email().required("Login is required"),
  password: string().required("Password is required"),
});

const Login = () => {
  const { push } = useRouter();
  const { user, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (user) push("/dashboard");
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const loginRes = await login(data.email, data.password);

      if (loginRes) {
        return push("/dashboard");
      }
    } catch (e) {
      console.log("e === ", e);
      setError("submit", { ...e, message: e?.message });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      <Card sx={{ width: 500 }} variant="outlined">
        <CardHeader
          title="Login"
          titleTypographyProps={{ variant: "h2", textAlign: "center", mb: 2 }}
        />
        <CardContent>
          <form
            id="signup"
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", height: 280 }}
          >
            <TextField
              label="Email"
              fullWidth
              {...register("email", { required: true })}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: true })}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            {errors?.lastName && <p>Password is required.</p>}
          </form>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LoadingButton
            type="submit"
            form="signup"
            sx={{ textAlign: "center" }}
          >
            Submit
          </LoadingButton>

          <Typography color="error" textAlign="center" mt={2}>
            {errors?.submit && <p>{errors?.submit?.message as string}</p>}
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        maxWidth="100vw"
        sx={{
          backgroundImage: "linear-gradient(to right, #076585, #fff)",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {page}
      </Box>
    </>
  );
};

export default Login;
