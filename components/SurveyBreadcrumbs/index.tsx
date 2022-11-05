import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

interface SurveyBreadcrumbsProps {
  path?: string | string[];
  subPath?: string;
  sx?: Record<string, unknown>;
}

const SurveyBreadcrumbs = ({ path, subPath, sx }: SurveyBreadcrumbsProps) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <Box role="presentation" onClick={handleClick} sx={sx}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          homepage
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/">
          dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/dashboard/${path}/`}
          aria-current="page"
        >
          {path}
        </Link>
        {subPath && (
          <Link
            underline="hover"
            color="inherit"
            href={`/dashboard/${path}/${subPath}`}
            aria-current="page"
          >
            {subPath}
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default SurveyBreadcrumbs;
