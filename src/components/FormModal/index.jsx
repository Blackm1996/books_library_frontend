import React from "react";
import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";

export const FormModal = ({ open, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { Close: handleClose });
  });
  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        maxWidth={fullScreen}
        fullWidth
      >
        <DialogContent className="bg-secondary-200">{childrenWithProps}</DialogContent>
      </Dialog>
    </StyledEngineProvider>
  );
};
