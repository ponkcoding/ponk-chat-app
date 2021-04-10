import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageForm: {
    overflow: "hidden",
    margin: "20px",
    padding: "0",
  },
}));

const MessageForm = () => {
  const classes = useStyles();

  return (
    <form className={classes.messageForm} noValidate autoComplete="off">
      <TextField
        id="input-message"
        variant="outlined"
        placeholder="type your message..."
        fullWidth={true}
        style={{ background: "#fff" }}
      />
    </form>
  );
};

export default MessageForm;
