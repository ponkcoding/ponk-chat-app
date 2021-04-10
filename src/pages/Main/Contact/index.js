import { gql, useQuery } from "@apollo/client";
import { Divider } from "@material-ui/core";
import ContactList from "../../../components/ContactList";

const GET_USERS = gql`
  query MyQuery($order_by: [users_order_by!] = { name: desc }) {
    users(order_by: $order_by) {
      id
      name
      picture
    }
  }
`;

const Contact = () => {
  const { data } = useQuery(GET_USERS, {
    variables: { order_by: { name: "asc" } },
  });
  const users = [{ id: null, name: "LOBI" }];
  if (data && data.users) {
    users.push(...data.users);
  }
  return (
    <div>
      {users.map((u) => {
        return (
          <div key={u.id}>
            <ContactList user={u}></ContactList>
            <Divider></Divider>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
