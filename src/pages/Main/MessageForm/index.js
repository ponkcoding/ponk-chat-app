import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, TextField } from "@material-ui/core";
import gql from "graphql-tag";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";

const INSERT_MESSAGE = gql`
  mutation insertMessage(
    $message: String = ""
    $toUserId: String = ""
    $fromUserId: String = ""
  ) {
    insert_messages_one(
      object: {
        message: $message
        toUserId: $toUserId
        fromUserId: $fromUserId
      }
    ) {
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  messageForm: {
    overflow: "hidden",
    margin: "20px",
    padding: "0",
  },
}));

const MessageForm = () => {
  const classes = useStyles();
  const [msg, setMsg] = useState("");
  const { user, isLoading } = useAuth0();
  const [toUser] = useRecoilState(selectedUserState);
  const [insertMessage, { loading }] = useMutation(INSERT_MESSAGE, {
    variables: { message: msg, fromUserId: user.sub, toUserId: toUser?.id },
  });

  const handleSubmit = async (e) => {
    console.log(msg);
    e.preventDefault();
    console.log("user.sub", user.sub);
    await insertMessage();
    setMsg("");
    document.getElementById("input-message").focus();
  };

  return (
    <form
      className={classes.messageForm}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="input-message"
        variant="outlined"
        placeholder="type your message..."
        fullWidth={true}
        value={msg}
        disabled={loading || isLoading}
        onChange={(e) => setMsg(e.target.value)}
        style={{ background: "#fff" }}
      />
    </form>
  );
};

export default MessageForm;
