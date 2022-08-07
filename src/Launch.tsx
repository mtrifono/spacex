import { useState } from "react";
//import ILaunch from "./ILaunch";
//import IMission from "./IMission";
import Mission from "./Mission";
import DropDown from "react-multilevel-dropdown";
import { gql, useQuery } from "@apollo/client";

//const rocketName = "Falcon 9";
const otherMissionsQuery = gql`
  query getOtherMissions($rocketName: String) {
    launchesPast(find: { rocket_name: $rocketName }) {
      mission_name
    }
  }
`;

export default function Launch({ launch, mission }: any): JSX.Element {
  const [showMissionDetails, setState] = useState(false);
  const { data, loading, error } = useQuery(otherMissionsQuery, {
    variables: launch.rocket.rocket.name
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{error.message}</pre>;
  let otherMissions = data.launchesPast.map((mission: any) => (
    <DropDown.Item key={mission.mission_name}>
      {mission.mission_name}
    </DropDown.Item>
  ));
  return (
    <div>
      <h3>{launch.mission_name}</h3>
      <p>Rocket: {launch.rocket.rocket.name}</p>
      <p>Launch date: {launch.launch_date_utc}</p>
      <p>Success status: {launch.launch_success ? "true" : "false"}</p>
      <button onClick={() => setState(!showMissionDetails)}>
        {!showMissionDetails ? "Show Mission Details" : "Hide Mission Details"}
      </button>
      {showMissionDetails ? (
        <div>
          {mission ? (
            <Mission mission_info={mission} />
          ) : (
            <p className="notFound">No mission details found for this launch</p>
          )}
        </div>
      ) : null}
      <div className="dropdown">
        <DropDown title="Other missions of the rocket">
          {otherMissions}
        </DropDown>
      </div>
    </div>
  );
}
