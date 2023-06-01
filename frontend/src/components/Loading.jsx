import React from "react";
import "../styles/loading.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <>
      <div className="loadingWrapper">
        <p className="loading">Loading...</p>
        {/* <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box> */}
      </div>
    </>
  );
};

export default Loading;
