import React, { useEffect, useState, lazy } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Input from "../atoms/Input/Input";
import "./HeroSection.css";
const CardWrapper = lazy(() => import("./CardWrapper"));
const ReactModal = lazy(() => import("../Modal/ReactModal"));

const typeColor = {
  normal: "#DDCBD0",
  fighting: "#FCC1B0",
  flying: "#B2D2E8",
  poison: "#CFB7ED",
  ground: "#C4A484",
  fire: "#EDC2C4",
  ice: "#C7D7DF",
  rock: "#C5AEA8",
  bug: "#C1E0C8",
  ghost: "#D7C2D7",
  stell: "#C2D4CE",
  water: "#CBD5ED",
  grass: "#C0D4C8",
  electric: "#E2E2A0",
  psychic: "#DDC0CF",
  dark: "#C6C5E3",
  fairy: "#E4C0CF",
  unknown: "#C0DFDD",
  shadow: "#CACACA",
  steel: "#C2D4CE",
};
function HeroSection() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [attackType, setAttackType] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const url = requests.fetchPokemonList;
    axios
      .get(url)
      .then((data) => {
        let arr = data.data.results;
        setPokemonList(arr);
        console.log(data.data.results[0].name);
      })
      .catch((err) => console.log(err));
  }, []);
  const openModal = (pokemon, isTrue) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(isTrue);
  };

  return (
    <>
      {isModalOpen ? (
        <ReactModal
          pokemonData={selectedPokemon}
          openModal={openModal}
          isModalOpen={isModalOpen}
          typeColor={typeColor}
        />
      ) : (
        ""
      )}
      <Input
        filterText={filterText}
        setFilterText={setFilterText}
        attackType={attackType}
        setAttackType={setAttackType}
      />
      <section className="hero-section flex">
        {pokemonList?.map(({ name, url, id }) => (
          <CardWrapper
            name={name}
            url={url}
            id={id}
            openModal={openModal}
            setSelectedPokemon={setSelectedPokemon}
            attackType={attackType}
            filterText={filterText}
            typeColor={typeColor}
          />
        ))}
      </section>
    </>
  );
}

export default HeroSection;
