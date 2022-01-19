import React from "react";
import axios from "axios";
import { connect } from "react-redux";
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
    next: "",
    prev: "",
    page: 1,
  };
  componentDidMount() {
    this.getPokemonData();
  }
  getPokemonData = () => {
    const URL = "https://pokeapi.co/api/v2/pokemon";
    const { location } = this.props;
    console.log("get", location.search);
    // const params = location.search
    //   .slice(1)
    //   .split("&")
    //   .map((param) => param.replace(/=/, ":"))
    //   .join(",");
    // const paramsObject = "{".concat(params, "}");
    // console.log(paramsObject);
    // localStorage["test"] = JSON.stringify({ foo: "bar", bar: "foo" });
    setTimeout(() => {
      axios
        .get(URL + location.search)
        .then((response) => {
          console.log("RESPONSE", response.data);
          this.setState({
            pokemons: response.data.results,
            next: response.data.next,
            prev: response.data.prev,
          });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }, 1000);
  };
  getPokemonView = () => {
    const { pokemons } = this.state;
    const pokemonsView = [];
    for (let idx = 0; idx < pokemons.length; idx++) {
      const element = <Card name={pokemons[idx].name} key={idx} />;
      pokemonsView.push(element);
    }
    return pokemonsView;
  };
  onNextPage = () => {
    this.setState(
      () => ({
        page: this.state.page + 1,
      }),
      () => {
        this.props.history.push(
          `?limit=10&offset=${10 * (this.state.page - 1)}`
        );
        console.log("cb", this.props.location.search);
        this.getPokemonData();
      }
    );
  };
  onPrevPage = () => {};
  render() {
    console.log("render", this.props.location.search);
    const { theme } = this.props;
    // console.log(theme.themeColor);
    const style = {
      backgroundColor: theme.themeColor === "dark" ? "grey" : "cornflowerblue",
    };
    // console.log(style);
    if (!this.props.location.search)
      this.props.history.push("?limit=10&offset=0");
    return (
      <div style={style}>
        <h1>Pokemon</h1>
        {/* js yang mereturnkan elemen html */}
        {/* {this.getPokemonView()} */}
        <section className="d-flex w-100 justify-content-around flex-wrap">
          {this.state.pokemons.map((pokemon, idx) => (
            <Card name={pokemon.name} key={idx} />
          ))}
        </section>
        <section className="d-flex justify-content-center">
          <div className="btn arrow">&lt;</div>
          <div className="btn arrow" onClick={this.onNextPage}>
            &gt;
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(Pokemon);
