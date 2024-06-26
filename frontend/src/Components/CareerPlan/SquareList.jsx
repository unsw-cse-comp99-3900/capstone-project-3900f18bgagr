import React from "react";
import { Box, Typography } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

export const SquareList = ({ values, setValues, setOpen }) => {
  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={5}>
      <ImageListItem>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            bgcolor: "grey.200",
            padding: 2,
            borderRadius: 10,
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Box>
      </ImageListItem>

      {values.map((item) => (
        <ImageListItem key={item}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              bgcolor: "grey.200",
              padding: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {item}
            </Typography>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
