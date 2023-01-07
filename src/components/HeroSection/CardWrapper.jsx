import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../atoms/Card/Card";

function HeroCard({
  name,
  url,
  openModal,
  id,
  attackType,
  filterText,
  typeColor,
}) {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonData1, setPokemonData1] = useState(null);

  useEffect(() => {
    if (!url) return;
    axios.get(url).then(({ data }) => {
      let clr = [];
      data?.types?.map((d) => clr.push(`${typeColor[d.type.name]}`));
      let bgColor = clr.join(",");
      setPokemonData({
        Imageurl: data?.sprites?.other?.dream_world?.front_default,
        name: name,
        id: data?.id,
        abilities: data?.abilities,
        height: data?.height,
        weight: data?.weight,
        species: data?.species,
        types: data?.types,
        bg:
          data?.types.length > 1
            ? { backgroundImage: `linear-gradient(to bottom, ${bgColor})` }
            : { background: bgColor },
        pokemonId: `${data.id}`.padStart(3, "0"),
      });
      setPokemonData1({
        Imageurl: data?.sprites?.other?.dream_world?.front_default,
        name: name,
        id: data?.id,
        abilities: data?.abilities,
        height: data?.height,
        weight: data?.weight,
        species: data?.species,
        types: data?.types,
        bg:
          data?.types.length > 1
            ? { backgroundImage: `linear-gradient(to bottom, ${bgColor})` }
            : { background: bgColor },
        pokemonId: `${data.id}`.padStart(3, "0"),
      });
    });
  }, [url, name]);

  useEffect(() => {
    if (attackType?.length > 0 || filterText.trim().length > 0) {
      const selectedType = attackType.map(function (i) {
        return i.value;
      });
      const pokmonType = pokemonData1?.types.map(function (i) {
        return i?.type?.name?.toUpperCase();
      });
      const found = pokmonType?.some((r) => selectedType.indexOf(r) >= 0);
      if (
        (attackType?.length > 0 ? found : true) &&
        (filterText.trim().length > 0
          ? pokemonData1.name.toLowerCase().includes(filterText.toLowerCase())
          : true)
      ) {
        setPokemonData(pokemonData1);
      } else {
        setPokemonData(null);
      }
    } else {
      setPokemonData(pokemonData1);
    }
  }, [attackType, pokemonData1, filterText]);
  return (
    <>
      {pokemonData ? (
        <Card
          openModal={openModal}
          pokemonData={pokemonData}
          typeColor={typeColor}
        />
      ) : null}
    </>
  );
}
export default HeroCard;
