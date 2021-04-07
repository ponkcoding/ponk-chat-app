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
  console.log("data", data);
  return (
    <div>
      <ContactList user={{ id: null, name: "LOBI" }}></ContactList>
      <Divider></Divider>
      {data.users.map((u) => {
        return (
          <div>
            <ContactList user={u}></ContactList>
            <Divider></Divider>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
