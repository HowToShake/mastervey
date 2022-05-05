import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { ReactElement, useState } from "react";
import Navbar from "../components/Navbar";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function generateLayout(i, key, list) {
  return {
    i: i.toString(),
    x: i * 2,
    y: 0,
    w: 2,
    h: 2,
    add: i === list.length - 1,
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  console.log("user", user);

  const { data: { data: surveys } = { data: [] }, status } = useQuery(
    "surveys",
    () =>
      axios.get(`getSurveys`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
  );

  const [layout, setLayout] = useState();
  const [breakpoint, setBreakpoint] = useState();
  const [items, setItems] = useState(surveys?.map(generateLayout));

  console.log("items", items, "surveys", surveys);

  const onAddItem = () => {
    const newItems = items?.concat({
      i: "n" + new Date().getTime(),
      x: (items?.length * 2) % (layout?.cols || 12),
      y: Infinity,
      w: 2,
      h: 2,
    });

    setItems(newItems);
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const i = el.add ? "+" : el.i;
    return (
      <div
        key={i}
        data-grid={el}
        style={{ backgroundColor: "transparent", border: "1px solid black" }}
      >
        {el.add ? (
          <span
            className="add text"
            onClick={onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(i)}
        >
          x
        </span>
      </div>
    );
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);
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
