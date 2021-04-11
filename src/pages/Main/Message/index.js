import { useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import MessageBubble from "../../../components/MessageBubble";
import { selectedUserState } from "../../../recoil";

const GET_MESSAGES = gql`
  subscription MyQuery($where: messages_bool_exp = {}) {
    messages(where: $where, order_by: { createdAt: asc }) {
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

  let params = { where: {} };
  if (selectedUser && !selectedUser.id) {
    params.where = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (selectedUser && selectedUser.id) {
    params.where = {
      _or: [
        {
          fromUserId: {
            _eq: user.sub,
          },
          toUserId: {
            _eq: selectedUser.id,
          },
        },
        {
          fromUserId: {
            _eq: selectedUser.id,
          },
          toUserId: {
            _eq: user.sub,
          },
        },
      ],
    };
  }
  const { data } = useSubscription(GET_MESSAGES, { variables: params });

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
