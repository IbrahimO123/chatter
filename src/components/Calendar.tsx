import { Modal, Box, Paper } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Para = {
  openCalendar: boolean;
  handleCloseCalendar: () => any;
};

const ModalCalendar = ({ openCalendar, handleCloseCalendar }: Para) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Modal
      open={openCalendar}
      onClose={handleCloseCalendar}
      sx={{
        display: "grid",
        alignSelf: "self",
        justifySelf: "center",
      }}
    >
      <Paper elevation={0}>
        <Box onClick={handleCloseCalendar} sx={{ float: "right" }} p={1} >
          <CancelIcon />
        </Box>
        <Calendar onChange={onChange} value={value}></Calendar>
      </Paper>
    </Modal>
  );
};


export default ModalCalendar