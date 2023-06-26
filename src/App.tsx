import "./App.css";
import { Routers } from "./routes/routers";
import { AppNav } from "./components/AppNav";
import "./assets/styles/main.css";
import { Snackbar, Alert } from "@mui/material";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateOtherState } from "./redux/Others/slice";

function App() {
  const others = useSelector((state: RootState) => state.others);
  const { open, message , severity} = others;
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    dispatch(updateOtherState({ ...others, open: false, message: "", severity }));
  };

  return (
    <>
      <AppNav />
      <Routers />
      <Snackbar
        onClose={handleSnackbarClose}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
