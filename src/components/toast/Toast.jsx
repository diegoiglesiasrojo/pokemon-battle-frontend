import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const Toast = ({ isToastVisible, handleClose, isErrorToast, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isToastVisible}
      onClose={() => handleClose()}
      autoHideDuration={3000}
    >
      <Alert
        onClose={() => handleClose()}
        severity={isErrorToast ? "error" : "success"}
        variant='filled'
        sx={{ width: "100%" }}
      >
        <p>{message}</p>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
