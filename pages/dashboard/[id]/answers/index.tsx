import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { ReactElement, useState } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { useMutation, useQuery } from "react-query";
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
import { Divider, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import SurveyBreadcrumbs from "@components/SurveyBreadcrumbs";
import LoadingButton from "@mui/lab/LoadingButton";
import DownloadIcon from "@mui/icons-material/Download";

const columns: GridColDef[] = [
  {
    headerName: "ID",
    field: "ID",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.id,
  },
  {
    headerName: "User",
    field: "resolvedBy.email",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.resolvedBy.email || "Anonymous",
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

  const { mutateAsync, isLoading } = useMutation(
    "getCSVAnswers",
    async () => {
      const { data } = await axios.get("getCSVAnswers", {
        params: {
          question: id,
        },
      });
      return data;
    },
    {
      onSuccess: (data) => {
        const contentType = "text/csv";
        const csvFile = new Blob([data.csv], { type: contentType });

        const href = URL.createObjectURL(csvFile);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "answers.csv"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      },
    }
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 8, minHeight: "100vh" }}>
      <SurveyBreadcrumbs path={id} subPath="answers" sx={{ my: 2 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          onClick={async () => await mutateAsync()}
          loading={isLoading}
          variant="outlined"
          sx={{ my: 1 }}
          startIcon={<DownloadIcon />}
        >
          Get Answers in CSV Format
        </LoadingButton>
      </div>
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
      <Divider sx={{ my: 5 }}>
        <Typography variant="h4">Most common answers</Typography>
      </Divider>
      <Grid container spacing={2} mt={4}>
        {answers?.total && (
          <>
            {Object.values(answers?.total)?.map(
              (answer: { question: string; answers: string[] }) => {
                const mostCommonAnswer = Object.keys(answer.answers).reduce(
                  (a, b) => (answers[a] > answers[b] ? a : b)
                );
                return (
                  <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Paper sx={{ p: 2, minHeight: 100 }}>
                      <Typography variant="h6">{answer.question}</Typography>
                      <Typography noWrap>{mostCommonAnswer}</Typography>
                    </Paper>
                  </Grid>
                );
              }
            )}
          </>
        )}
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
