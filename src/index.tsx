//import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  gql
} from "@apollo/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

(async () => {
  let missions_info = await client.query({
    query: gql`
      query {
        missions {
          id
          name
          description
          payloads {
            id
            manufacturer
            nationality
            payload_mass_lbs
          }
        }
      }
    `
  });
  let missions = missions_info.data.missions;
  let result = await client.query({
    query: gql`
      query {
        launchesPast(limit: 50, sort: "launch_date_utc", order: "desc") {
          id
          launch_date_utc
          launch_date_unix
          launch_success
          mission_id
          mission_name
          rocket {
            rocket {
              id
              name
            }
          }
        }
      }
    `
  });
  let launches = result.data.launchesPast;

  function missionsGen() {
    let lst = [];
    for (let i in launches) {
      lst.push(missions.find((m: any) => m.id === launches[i].mission_id[0]));
    }
    return lst;
  }
  let mission_details = missionsGen();
  console.log(launches);
  console.log(mission_details);
  root.render(
    <ApolloProvider client={client}>
      <App missions_data={mission_details} launches_data={launches} />
    </ApolloProvider>
  );
})();
