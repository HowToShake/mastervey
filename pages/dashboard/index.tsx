import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { ReactElement, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { useRouter } from "next/router";

function generateLayout(i, key, list, cols) {
  return {
    i: i?.name,
    x: (key * 2) % (cols || 12),
    y: Infinity,
    w: 2,
    h: 2,
    add: i === list.length - 1,
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  const query = useQuery("surveys", () =>
    axios.get(`getSurveys`, {
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    })
  );

  const [layout, setLayout] = useState();
  const [breakpoint, setBreakpoint] = useState();
  const [items, setItems] = useState(
    query?.data?.data?.map((i, key, list) =>
      generateLayout(i, key, list, breakpoint?.cols)
    ) || []
  );

  const mutation = useMutation((data) =>
    axios.post("createSurvey", data, {
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    })
  );

  useEffect(() => {
    const newItems = query?.data?.data?.map((i, key, list) =>
      generateLayout(i, key, list, breakpoint?.cols)
    );

    setItems(newItems);
  }, [query?.data?.data]);

  const onAddItem = async () => {
    try {
      const name = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });

      const res = await mutation.mutateAsync({ name });

      if (res?.status === 200) {
        const newItem = [res?.data]?.map((i, key, list) =>
          generateLayout(i, key, list, breakpoint?.cols)
        );
        setItems([...items, ...newItem]);
      }
    } catch (e) {
      console.log("e === ", e);
    }
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };

    return (
      <Box
        key={el?.i}
        data-grid={el}
        style={{
          backgroundColor: "transparent",
          border: "1px solid black",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ p: 1 }}
          onClick={() => {
            router.push(`/dashboard/${el?.i}`);
          }}
        >
          <Typography variant="h6">{el?.i}</Typography>
        </Button>
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(el?.i)}
        >
          x
        </span>
      </Box>
    );
  };

  const onRemoveItem = (i) => {
    const newItems = _.reject(items, { i: i });

    setItems(newItems);
  };

  return (
    <>
      <Box>
        <Button
          onClick={onAddItem}
          sx={{ justifySelf: "end", textAlign: "center" }}
        >
          Add
        </Button>
        <Typography
          textAlign="center"
          variant="h2"
          sx={{ justifySelf: "center" }}
        >
          Your surveys
        </Typography>
      </Box>
      <ResponsiveReactGridLayout
        onLayoutChange={(layout) => setLayout(layout)}
        onBreakpointChange={(breakpoint, cols) =>
          setBreakpoint({ breakpoint: breakpoint, cols: cols })
        }
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </>
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
