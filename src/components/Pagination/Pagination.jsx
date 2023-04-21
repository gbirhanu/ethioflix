import React from "react";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const theme = useTheme();
  const handlePrev = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          margin: "30px 2px",
          color: theme.palette.secondary[100],
        }}
        variant="contained"
        type="button"
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography
        variant="h4"
        sx={{
          margin: "0 20px  !important",
          color: theme.palette.secondary[100],
        }}
      >
        {currentPage}
      </Typography>
      <Button
        sx={{
          margin: "30px 2px",
          color: theme.palette.secondary[100],
        }}
        variant="contained"
        type="button"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
