import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { ReactElement, useState } from "react";
import Navbar from "../components/Navbar";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  console.log("user", user);

  const [state, setState] = useState({
    items: [0, 1, 2, 3, 4].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        add: i === list.length - 1,
      };
    }),
    newCounter: 0,
  });

  const onAddItem = () => {
    setState({
      ...state,
      items: state.items.concat({
        i: "n" + state.newCounter,
        x: (state.items.length * 2) % (state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2,
      }),

      newCounter: state.newCounter + 1,
    });
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
      <div key={i} data-grid={el} style={{ backgroundColor: "red" }}>
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
        <span className="remove" style={removeStyle}>
          x
        </span>
      </div>
    );
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setState({
      ...state,
      breakpoint: breakpoint,
      cols: cols,
    });
  };

  const onLayoutChange = (layout) => {
    setState({ ...state, layout: layout });
  };

  console.log("state", state);

  return (
    <ResponsiveReactGridLayout
      onLayoutChange={onLayoutChange}
      onBreakpointChange={onBreakpointChange}
      className="layout"
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
    >
      {_.map(state.items, (el) => createElement(el))}
    </ResponsiveReactGridLayout>
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
