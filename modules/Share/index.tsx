import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

const Share = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  const copyURL =
    window?.location?.href?.replace(router?.asPath, "") +
    "/share/" +
    router?.query?.id;

  function copyToClipboard(e) {
    textAreaRef?.current?.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }
  return (
    <>
      <Typography textAlign="center" variant="h1">
        Share
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
            style={{ width: 600 }}
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

export default Share;
