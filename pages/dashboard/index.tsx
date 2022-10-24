import { ReactElement, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useQuery } from "react-query";
import AddNewSurveyDrawer from "@modules/Dashboard/components/AddNewSurveyDrawer";
import * as React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { data: surveys } = useQuery("getSurveys", async () => {
    const { data } = await axios.get("/getSurveys");
    return data;
  });

  return (
    <Container maxWidth="xl">
      <Stack
        sx={{ justifyContent: "center", mb: 3 }}
        direction="row"
        spacing={2}
      >
        <Typography
          textAlign="center"
          variant="h2"
          sx={{ justifySelf: "center", mt: 3, mb: 3 }}
        >
          <b>Your surveys</b>
        </Typography>
        <Box alignSelf="center">
          <IconButton
            onClick={() => setIsDrawerOpen((prev: boolean) => !prev)}
            color="primary"
          >
            <Tooltip title="Add new survey">
              <AddIcon sx={{ bgcolor: "primary" }} />
            </Tooltip>
          </IconButton>
        </Box>
        <AddNewSurveyDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        rowGap={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {surveys?.map((survey) => {
          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={survey.name}
              sx={{
                textAlign: "center",
              }}
              onClick={() => router.push(`/dashboard/${survey.name}/generate`)}
            >
              <Item sx={{ "&: hover": { cursor: "pointer" } }}>
                <Tooltip title={survey.name}>
                  <Typography noWrap>{survey.name}</Typography>
                </Tooltip>
                <Typography noWrap sx={{ fontSize: 8 }}>
                  {survey.isPublic ? "Public" : "Private"}
                </Typography>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};

Dashboard.requireAuth = true;

export default Dashboard;
