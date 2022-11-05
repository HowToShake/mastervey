import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ReactElement, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import * as React from "react";
import { dehydrate, QueryClient } from "react-query";
import axios from "axios";
import { Survey } from "@pages/dashboard/[id]/preview";
import SurveyBreadcrumbs from "@components/SurveyBreadcrumbs";

const Share = ({ survey }: { survey: Survey }) => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRefLink = useRef(null);
  const textAreaRef = useRef(null);
  const {
    query: { id },
  } = router;

  const copyURL =
    window?.location?.href?.replace(router?.asPath, "") +
    "/share/" +
    survey.shareLink;

  function copyToClipboard(e) {
    textAreaRef?.current?.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  function copyLinkToClipboard(e) {
    textAreaRefLink?.current?.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }
  return (
    <>
      <SurveyBreadcrumbs path={id} subPath="share" sx={{ my: 2, ml: 3 }} />
      <Typography textAlign="center" variant="h2" mb={3}>
        <b>Share</b>
      </Typography>
      <Typography textAlign="center" variant="h4">
        <b>Share via link</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <form>
          <textarea
            ref={textAreaRefLink}
            value={copyURL}
            style={{ width: 800 }}
          />
        </form>
        <IconButton onClick={copyLinkToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
      <Typography textAlign="center" variant="h4">
        <b>Share via iframe</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form>
          <textarea
            ref={textAreaRef}
            value={`<iframe src="${copyURL}" title="View"></iframe>`}
            style={{ width: 800 }}
          />
        </form>
        <IconButton onClick={copyToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <iframe
          src={copyURL}
          title="View"
          style={{ width: 1000, height: 800 }}
        />
      </Box>
    </>
  );
};

Share.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

Share.requireAuth = true;

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getSurvey", async () => {
    const { data } = await axios.get("getSurvey", {
      params: { name: context.params.id },
    });
    return data;
  });

  const data = dehydrate(queryClient).queries?.[0]?.state?.data || [];

  return {
    props: {
      survey: data,
    },
  };
}

export default Share;
