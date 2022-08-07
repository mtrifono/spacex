import "./styles.css";
import Launch from "./Launch";

export default function App({ launches_data, missions_data }: any) {
  let indexes = Array.from(Array(launches_data.length).keys());
  let list = indexes.map((index: number) => (
    <li className="launch" key={index}>
      <Launch launch={launches_data[index]} mission={missions_data[index]} />
    </li>
  ));
  return (
    <div className="App">
      <h1>Launches</h1>
      <ul>{list}</ul>
    </div>
  );
}
