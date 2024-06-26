import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import {
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { RectangleList } from "./RectangleList";

import { PopupDialogContent } from "./PopupDialogContent";

export const PopupDialog = ({
  open,
  setOpen,
  selected,
  all,
  setSelected,
  title,
}) => {
  const [cachedKeyword, setCachedKeyword] = React.useState("");

  const [keyword, setKeyword] = React.useState("");

  const [cachedSelected, setCachedSelected] = React.useState(selected);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <PopupDialogContent
          all={all}
          cachedKeyword={cachedKeyword}
          setCachedKeyword={setCachedKeyword}
          keyword={keyword}
          setKeyword={setKeyword}
          cachedSelected={cachedSelected}
          setCachedSelected={setCachedSelected}
        ></PopupDialogContent>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setCachedSelected(selected);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setSelected(cachedSelected);
            setOpen(false);
          }}
        >
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
