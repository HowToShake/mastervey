import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import {
  Card,
  CardActions,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/useAuth";
import Typography from "@mui/material/Typography";
import { useSignupMutation } from "../services/auth";
import CardContent from "@mui/material/CardContent";

const Signup = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data) => {
    try {
      await signup(data);

      const loginRes = await login(data.email, data.password);

      if (loginRes) {
        await router.push("/dashboard");
      }
    } catch (e) {
      console.log("e === ", e);
      setError("submit", { ...e, message: e?.message });
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="md"
      >
        <Card sx={{ width: 500 }}>
          <CardHeader
            title="Signup"
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
                {...register("email")}
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
              {errors.lastName && <p>Password is required.</p>}
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
              loading={isLoading}
            >
              Submit
            </LoadingButton>
            <Typography color="error" textAlign="center" mt={2}>
              {errors?.submit && <p>{errors?.submit?.message}</p>}
            </Typography>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        maxWidth="100vw"
      >
        {page}
      </Box>
    </>
  );
};

export default Signup;
