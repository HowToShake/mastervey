import { useRouter } from "next/router";
import AnswerCard from "@modules/Answers/components/AnswerCard";
import Container from "@mui/material/Container";
import { ReactElement, useState } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { useQuery } from "react-query";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import IconButton from "@mui/material/IconButton";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

const columns: GridColDef[] = [
  {
    headerName: "User",
    field: "resolvedBy.email",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.resolvedBy.email,
  },
  {
    headerName: "Resolved at",
    field: "resolvedAt",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      format(new Date(params.row.resolvedAt), "dd/MM/yyyy HH:mm"),
  },
  {
    headerName: "Actions",
    field: "id",
    flex: 1,
    renderCell: (params: GridValueGetterParams) => {
      const {
        push,
        query: { id },
      } = useRouter();

      return (
        <IconButton
          onClick={() => push(`/dashboard/${id}/answers/${params.row.id}`)}
        >
          <InfoTwoToneIcon />
        </IconButton>
      );
    },
  },
];

const Index = () => {
  const {
    query: { id },
  } = useRouter();

  const [pageSize, setPageSize] = useState<number>(20);

  const { data: answers = [] } = useQuery("getAnswers", async () => {
    const { data } = await axios.get("getAnswers", {
      params: {
        question: id,
      },
    });
    return data;
  });

  console.log("answers", answers);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      {answers?.answers && (
        <DataGrid
          autoHeight
          rows={answers?.answers}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection={false}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      )}
      <Grid container spacing={2} mt={4}>
        {/*{Object.values(answers?.total)?.map(*/}
        {/*  (answer: { question: string; answers: string[] }) => (*/}
        {/*    <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>*/}
        {/*      <Paper>*/}
        {/*        <Typography>{answer.question}</Typography>*/}
        {/*      </Paper>*/}
        {/*    </Grid>*/}
        {/*  )*/}
        {/*)}*/}
      </Grid>
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

Index.requireAuth = true;

export default Index;
