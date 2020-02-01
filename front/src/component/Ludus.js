import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class Ludus extends React.Component {
  state = {
    combatList: [],
    id_combat: 0,
    typeList: [],
    types: [],
    combatIsSelected: false
  };

  ////HANDLESELECT////
  handleChange = event => {
    let list = [];

    switch (event.target.name) {
      case "combats":
        list = this.state.combatList;
        break;
      default:
        list = this.state.typeList;
    }
    const tmp = list.filter(item => {
      return item.id == event.target.value;
    });

    this.setState({
      [event.target.name]: this.state[event.target.name].concat(tmp)
    });
    event.preventDefault();
  };

  ////AXIOSPOST////
  handleSubmitCombat = () => {
    const combat_types = {
      id_combat: this.state.id_combat,
      types: this.state.types
    };
    axios
      .post("/combat", combat_types)
      .then(response => response.data)
      .then(data => {
        console.log(data);
      });
  };

  /////AXIOSGET/////
  getCombat() {
    axios.get(`/combat/all`).then(res => {
      this.setState({ combatList: res.data });
    });
  }

  getTypes() {
    axios.get(`/combat/type/all`).then(res => {
      this.setState({ typeList: res.data });
    });
  }

  componentDidMount() {
    this.getTypes();
    this.getCombat();
  }
  /////HANDLECLICK DELETE FROM STATE//////
  handleClickTyp = name => {
    const interest = this.state.types;
    const index = interest.indexOf(name);
    interest.splice(index, 1);
    this.setState({ interest: interest });
  };

  ////ADD TYPE ////
  addType = e => {
    e.preventDefault();
    this.setState(
      {
        combatIsSelected: !this.state.combatIsSelected,
        id_combat: e.target.value
      },
      () => this.state
    );
  };

  ///////RENDER//////
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmitCombat}>
          <h1 class="display-2 mb-5">Fight</h1>
          <div className="Ludus">
            {console.log("poil", this.state.combatList)}
            {this.state.combatList.map((combat, i) => (
              <div className="d-inline-block mx-5" key={i}>
                <p>
                  <h3 className="display-4 text-dark">{combat.name}</h3>
                  <button
                    className="btn btn-danger"
                    value={combat.id}
                    onClick={this.addType}
                  >
                    Add Types for this Fight
                  </button>
                </p>
              </div>
            ))}
          </div>
        </form>
        {this.state.combatIsSelected && this.state.id_combat !== 0 ? (
          <>
            <h1 className="display-3 my-5">Ludus</h1>
            <div className="Ludus">
              <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={this.handleChange}
                require
                type="text"
                name="types"
                placeholder="Select two types or more.."
              >
                <option>Sélectionnez un type</option>
                {this.state.typeList &&
                  this.state.typeList.map(data => (
                    <option value={data.id}>{data.name}</option>
                  ))}
              </select>
              {this.state.types.map(card => {
                return (
                  <li className=" btn btn-danger d-inline-block mx-4 my-2">
                    <h1 className="display-5">{card.name}</h1>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleClickTyp(card)}
                    >
                      <h3>X</h3>
                    </button>
                  </li>
                );
              })}
            </div>
            <Link to="/emperor">
              <button
                className="btn btn-danger  my-4 py-4 px-4"
                onClick={this.handleSubmitCombat}
              >
                Send your list to your Emperor
              </button>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Ludus);
