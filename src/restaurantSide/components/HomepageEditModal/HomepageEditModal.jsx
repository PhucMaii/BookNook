import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blueGrey } from "../../../theme/colors";
import { Divider, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const HomepageEditModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="filled"
        style={{ color: "#64748B", backgroundColor: blueGrey }}
      >
        EDIT
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container justifyContent={'space-between'} mb={'10px'}>
              <Grid  item>
                <Typography fontWeight={'bold'} variant="h4">Edit Reservation</Typography>
              </Grid>
              <Grid item>
              <Button variant="contained" color="secondary">SAVE</Button>
              </Grid>
            </Grid>
            <Divider/>
            <Box container>
              
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
