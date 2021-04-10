import { Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";

const MessageHeader = () => {
  const [selectedUser] = useRecoilState(selectedUserState);

  return (
    <Typography variant="h6" noWrap>
      {selectedUser?.name}
    </Typography>
  );
};

export default MessageHeader;
