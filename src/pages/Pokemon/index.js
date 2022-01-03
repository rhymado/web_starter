import React from "react";
import axios from "axios";
import "./index.css";

function Card(props) {
  return (
    <section className="card m-2">
      <p>{props.name}</p>
    </section>
  );
}

class Pokemon extends React.Component {
  state = {
    pokemons: [],
  };
  componentDidMount() {
    const URL = "https://pokeapi.co/api/v2/pokemon";
    const { location } = this.props;
    setTimeout(() => {
      axios
        .get(URL + location.search)
        .then((response) => {
          console.log("RESPONSE", response.data);
          this.setState({
            pokemons: response.data.results,
          });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }, 1000);
  }
  getPokemonView = () => {
    const { pokemons } = this.state;
    const pokemonsView = [];
    for (let idx = 0; idx < pokemons.length; idx++) {
      const element = <Card name={pokemons[idx].name} key={idx} />;
      pokemonsView.push(element);
    }
    return pokemonsView;
  };
  render() {
    return (
      <div>
        <h1>Pokemon</h1>
        {/* js yang mereturnkan elemen html */}
        {this.getPokemonView()}
        <section className="d-flex w-100 justify-content-around flex-wrap">
          {this.state.pokemons.map((pokemon, idx) => (
            <Card name={pokemon.name} key={idx} />
          ))}
        </section>
      </div>
    );
  }
}

export default Pokemon;
