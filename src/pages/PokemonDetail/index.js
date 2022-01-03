import React from "react";
import axios from "axios";

class PokemonDetail extends React.Component {
  state = {
    pokemonData: {},
    isSuccess: false,
  };
  componentDidMount() {
    const { match } = this.props;
    const URL = "https://pokeapi.co/api/v2/pokemon/";
    setTimeout(() => {
      axios
        .get(URL + match.params.id)
        .then((response) =>
          this.setState({ pokemonData: response.data, isSuccess: true })
        )
        .catch((err) => console.error(err));
    }, 1000);
  }
  render() {
    const { match } = this.props;
    const { pokemonData: pokemon, isSuccess } = this.state;
    return (
      <div>
        <h1>Pokemon #{match.params.id}</h1>
        {/* Conditional Rendering */}
        {/* ternary
        * jika ada kedua kondisinya gunakan ?
        * jika hanya kondisi benar gunakan &&
        * jika hanya kondisi salah gunakan ||
        */}
        {isSuccess ? (
          <section>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt="front_default" />
          </section>
        ) : (
          <p>Sedang Fetching</p>
        )}
      </div>
    );
  }
}

export default PokemonDetail;
