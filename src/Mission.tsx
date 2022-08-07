import { Component } from "react";
import IMission from "./IMission";

export default class Mission extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Description: {this.props.mission_info.description}</p>
        <ul className="payloads">
          Payloads:
          {this.props.mission_info.payloads.map((payload: any) =>
            payload ? (
              <li key={payload.id} className="payload">
                id: {payload.id} ; manufacturer: {payload.manufacturer}; mass:
                {payload.payload_mass_lbs ? payload.payload_mass_lbs : " N/A"}
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }
}

type Props = {
  mission_info: IMission;
};

type State = {};
