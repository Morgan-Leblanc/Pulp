import React from "react";
import axios from "axios";
import GIF from "../assets/pictures/giphy.gif";

class Emperor extends React.Component {
  state = {
    combats: [],
    combatsByTypes: [],
    gladiators: [],
    gladiatorList: [],
    skillList: [],
    skillByGladiator_id: [],
    displayGladiator: false,
    displayTypes: false,
    combat_id: 0,
    gladiator_id: 0,
    displayPhoto: false
  };

  ///HANDLECHANGE////

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  ///AXIOS GET ///
  getGladiators = () => {
    axios.get(`/gladiator/all`).then(res => {
      this.setState({ gladiatorList: res.data });
    });
  };

  getSkills = () => {
    axios.get(`/combat/allskill`).then(res => {
      this.setState({ skillList: res.data });
    });
  };

  getCombats = () => {
    axios
      .get(`/combat/all`)
      .then(response => response.data)
      .then(
        data => {
          this.setState({
            combats: data
          });
        },
        () => this.state.combats
      );
  };

  getGladiatorByType = e => {
    axios
      .get(`/combat/gladiators/${e.target.value}`)
      .then(response => response.data)
      .then(
        data => {
          this.setState({
            gladiatorList: data,
            displayGladiator: !this.state.displayGladiator,
            displayPhoto: true
          });
        },
        () => this.state
      );
  };

  getCombatInfos = e => {
    const id = e.target.value;
    axios
      .get(`/combat/types/${id}`)
      .then(response => response.data)
      .then(
        data => {
          this.setState({
            combatsByTypes: data,
            combat_id: id
          });
        },
        () => this.state.combatsByTypes
      );
  };
  ///AXIOS POST ///
  addGladiator = e => {
    const gladiator_skill = {
      id_gladiator: e.target.value,
      id_skill: this.state.skillByGladiator_id
    };
    const gladiator_combat = {
      id_gladiator: e.target.value,
      id_combat: this.state.combat_id
    };
    axios
      .post("/combat/add-gladiator", gladiator_combat)
      .then(response => response.data)
      .then(data => {
        alert(data);
      });
    if (gladiator_skill.id_skill) {
      axios
        .post("/combat/add-skill", gladiator_skill)
        .then(response => response.data);
    }
  };

  componentDidMount() {
    this.getGladiators();
    this.getCombats();
    this.getSkills();
  }

  render() {
    return (
      <div className="">
        <h1 className="display-2 mb-5">Emperor</h1>
        {this.state.combats.map((combat, i) => (
          <div className="d-inline-block mx-5" key={i}>
            <h3 className="display-3 text-dark ml-5">{combat.name}</h3>
            <button
              type="button"
              className=" ml-5 btn btn-danger mb-5"
              onClick={this.getCombatInfos}
              value={combat.id}
            >
              Voir plus
            </button>
          </div>
        ))}
        {this.state.combatsByTypes
          ? this.state.combatsByTypes.map((type, i) => (
              <div className="d-table-cell ml-3 my-3 ">
                <p key={i}>
                  <h4 className=" text-dark">
                    {type.name} for combat number {type.id_combat}
                  </h4>
                  <button
                    type="button"
                    className="btn btn-danger mx-5 mt-5 my-4 py-4 px-4"
                    onClick={this.getGladiatorByType}
                    value={type.id_type}
                  >
                    Afficher les gladiateurs dispo
                  </button>
                </p>
              </div>
            ))
          : ""}
        {this.state.displayGladiator && this.state.gladiatorList
          ? this.state.gladiatorList.map((gladiator, i) => (
              <div className="d-inline mx-5 my-5">
                <p key={i}>
                  <h2 className=" display-4 text-dark">{gladiator.name}</h2>
                  <p>
                    {gladiator.is_skillable ? (
                      <select
                        className=" w-50 custom-select "
                        onChange={this.handleChange}
                        name="skillByGladiator_id"
                      >
                        <option>--Selectionne le skill--</option>
                        {this.state.skillList.map(data => (
                          <option value={data.id}>{data.name}</option>
                        ))}
                      </select>
                    ) : (
                      ""
                    )}
                  </p>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.addGladiator}
                    value={gladiator.id}
                  >
                    Ajouter le gladiateur au combat
                  </button>
                </p>
              </div>
            ))
          : ""}
        {this.state.displayPhoto ? (
          <div>
            <img src={GIF} alt="gitmerge" />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Emperor;
