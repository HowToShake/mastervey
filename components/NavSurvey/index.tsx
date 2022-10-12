import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

const NavSurvey = () => {
  const { pathname, query } = useRouter();
  const { id } = query;

  return (
    <Box sx={{ width: "100%", backgroundColor: "secondary" }}>
      <Tabs
        value={pathname}
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          value={`/dashboard/${id}/generate`}
          label={
            <Link href={`/dashboard/${id}/generate`}>
              <Typography color="primary">
                <b>Generate</b>
              </Typography>
            </Link>
          }
        />

        <Tab
          value={`/dashboard/${id}/answers`}
          label={
            <Link href={`/dashboard/${id}/answers`}>
              <Typography color="primary">
                <b>Answers</b>
              </Typography>
            </Link>
          }
        />
        <Tab
          value={`/dashboard/${id}/preview`}
          label={
            <Link href={`/dashboard/${id}/preview`}>
              <Typography color="primary">
                <b>Preview</b>
              </Typography>
            </Link>
          }
        />
        <Tab
          value={`/dashboard/${id}/share`}
          label={
            <Link href={`/dashboard/${id}/share`}>
              <Typography color="primary">
                <b>Share</b>
              </Typography>
            </Link>
          }
        />
      </Tabs>
    </Box>
  );
};

export default NavSurvey;
