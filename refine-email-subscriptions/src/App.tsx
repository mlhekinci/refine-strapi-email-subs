import { Refine, Resource } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "authProvider";
import { Header, Layout, OffLayoutArea } from "components";
import { SubscriberList, CreateSubscriber } from "./pages/subscriber";
import { MessageList, MailCreate } from './pages/mail'

function App() {
  const API_URL = "http://localhost:1337";

  const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL, axiosInstance);
  return (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      Header={Header}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    >
      <Resource
        name="subscribers"
        list={SubscriberList}
        create={CreateSubscriber}
      />

      <Resource
        name="messages"
        list={MessageList}
        create={MailCreate}
      />
    </Refine>
  );
}

export default App;
