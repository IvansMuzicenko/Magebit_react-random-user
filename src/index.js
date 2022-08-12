import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";

// import App from "./App";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: ""
    };
    this.changeData()();
  }
  async getRandom() {
    const response = await fetch("https://randomuser.me/api/");
    const response_json = await response.json();
    if (response.status === 200) {
      return {
        firstname: response_json.results[0].name.first,
        lastname: response_json.results[0].name.last,
        photo: response_json.results[0].picture.medium,
        phone: response_json.results[0].phone,
        email: response_json.results[0].email
      };
    }
  }

  changeData() {
    const that = this;
    return async function () {
      const random = await that.getRandom();
      document.querySelector(".firstInput").value = random.firstname;
      document.querySelector(".lastInput").value = random.lastname;
      that.setState({
        image: random.photo,
        firstname: random.firstname,
        lastname: random.lastname,
        phone: random.phone,
        email: random.email
      });
    };
  }
  changeFirst() {
    const that = this;
    return function () {
      const firstname = document.querySelector(".firstInput").value;
      that.setState({
        firstname: firstname
      });
    };
  }
  changeLast() {
    const that = this;
    return function () {
      const lastname = document.querySelector(".lastInput").value;
      that.setState({
        lastname: lastname
      });
    };
  }
  render() {
    return (
      <div className="card">
        <img alt="" className="card-image" src={this.state.image}></img>
        <h3 className="card-fullname">
          {this.state.firstname + " " + this.state.lastname}
        </h3>
        <p className="card-phone">{this.state.phone}</p>
        <p className="card-email">{this.state.email}</p>

        <input
          className="firstInput"
          type="text"
          onChange={this.changeFirst()}
        />
        <input className="lastInput" type="text" onChange={this.changeLast()} />
        <button onClick={this.changeData()}>Get random</button>
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <Card />
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
