import { useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import MessageBubble from "../../../components/MessageBubble";
import { selectedUserState } from "../../../recoil";

const GET_MESSAGES = gql`
  subscription MyQuery(
    $toUserId: String_comparison_exp = {}
    $fromUserId: String_comparison_exp = {}
  ) {
    messages(where: { toUserId: $toUserId, fromUserId: $fromUserId }) {
      id
      fromUserId
      message
      fromUser {
        name
        picture
      }
      createdAt
    }
  }
`;

const Message = () => {
  const [selectedUser] = useRecoilState(selectedUserState);
  const { user } = useAuth0();
  let params = {};
  if (selectedUser && !selectedUser.id) {
    params = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (selectedUser && selectedUser.id) {
    params = {
      toUserId: {
        _eq: selectedUser.id,
      },
    };
  }
  const { data } = useSubscription(GET_MESSAGES, { variables: params });
  console.log("data", data);

  setTimeout(() => {
    const cb = document.getElementById("chat-content").parentElement;
    if (cb) {
      cb.scrollTop = cb.scrollHeight;
    }
  }, 200);

  return (
    <div id="chat-content">
      {data?.messages.map((m) => {
        return (
          <MessageBubble
            key={m.id}
            message={m}
            isMe={user.sub === m.fromUserId}
          ></MessageBubble>
        );
      })}
    </div>
  );
};
export default Message;
