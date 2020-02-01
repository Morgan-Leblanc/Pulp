import React from "react";
import { withRouter, Link } from "react-router-dom";

class Homepage extends React.Component {
  handleStore = event => {
    localStorage.setItem("Pseudo", event.target.value);
  };

  render() {
    return (
      <div className="container">
        <form>
          <h1 className="display-1 .bounce">You are Ready for the fight ?</h1>
          <input
            className="form-control my-5 px-5 py-4"
            onChange={this.handleStore}
            placeholder="Enter your pseudo..."
            name="pseudo"
            type="text"
          ></input>
          <Link to="/ludus">
            <button type="button" className="btn btn-danger px-5 py-4">
              FIGHT
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Homepage);
