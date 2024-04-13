import React from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";

export const ImageModal = ({ open, onClose, src }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="bg-secondary-200">
          <img src={src}></img>
        </DialogContent>
      </Dialog>
    </StyledEngineProvider>
  );
};
