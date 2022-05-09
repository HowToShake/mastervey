import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import GenerateSurvey from "../../modules/GenerateSurvey";
import PreviewSurvey from "../../modules/PreviewSurvey";
import Answers from "../../modules/Answers";
import Share from "../../modules/Share";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DetailedSurvey = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const [value, setValue] = useState(0);

  useEffect(() => {
    push(`${id}?tab=${value}`);
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Generate" />
          <Tab label="Answers" />
          <Tab label="Preview" />
          <Tab label="Share" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GenerateSurvey />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Answers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PreviewSurvey />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Share />
      </TabPanel>
    </Box>
  );
};

DetailedSurvey.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};

DetailedSurvey.requireAuth = true;

export default DetailedSurvey;
