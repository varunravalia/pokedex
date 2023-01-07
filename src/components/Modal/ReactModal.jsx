import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Card from "../atoms/Card/Card";
import CrossSvgr from "../../Icons/CrossSvgr";
import "./ReactModal.css";
import axios from "../../utils/axios";

function ModalHero({
  isModalOpen,
  openModal,
  pokemonData,
  pokemonId,
  typeColor,
}) {
  const [noDamage, setNoDamage] = useState([]);
  const [discription, setDiscription] = useState("");
  const [isFullDiscription, setIsFullDiscription] = useState(false);
  const [eggGroup, setEgggroup] = useState("");
  const [ability, setAbility] = useState("");

  useEffect(() => {
    const pokemonAbility = pokemonData?.abilities.map((a) => {
      return a.ability.name;
    });
    setAbility(pokemonAbility.join(","));

    function getWeakAgainst() {
      let noDamage = [];
      pokemonData.types.map(async (type) => {
        let weakAgainstResp = await axios.get(type.type.url);
        noDamage = [
          ...noDamage,
          ...weakAgainstResp.data.damage_relations.no_damage_to.map(
            (e) => e.name
          ),
        ];
        setNoDamage(noDamage);
      });
    }
    async function getDiscription() {
      let pokemonDiscription = [];
      let response = await axios.get(pokemonData.species.url);
      let PokemonEgggroup = [];
      for (const group of response.data.egg_groups) {
        PokemonEgggroup.push(group.name);
      }
      console.log(PokemonEgggroup);
      setEgggroup(PokemonEgggroup.join(" ,"));
      for (const text of response.data.flavor_text_entries) {
        if (text.language?.name === "en") {
          pokemonDiscription.push(text.flavor_text);
        }
      }
      let uniqueDiscription = [...new Set(pokemonDiscription)];
      pokemonDiscription = [...uniqueDiscription];
      setDiscription(pokemonDiscription.join(" "));
    }
    getWeakAgainst();
    getDiscription();
  }, []);
  return (
    <>
      <Modal isOpen={isModalOpen} className="modal-blur">
        <section className="Modal-header">
          <div>
            <Card
              pokemonData={pokemonData}
              openModal={openModal}
              noDiscription={true}
            />
          </div>
          <div className="Modal-crosss">
            <div className="modal-cr">
              <span className="modalLines"></span>
              <h1 className="pokemonName">{pokemonData?.name}</h1>
              <span className="modalLines"></span>
              <span className="pokeMonId">{pokemonData.pokemonId}</span>
              <CrossSvgr
                className="btn-modal"
                onClick={() => openModal({}, false)}
              />
            </div>
            <div className="pokemonDis">
              <p className="descriotion">{discription}</p>
              <p onClick={() => setIsFullDiscription(true)}>read more</p>
            </div>
          </div>
        </section>

        <section className="hW-section">
          <div className="hW-sec">
            <label className="measurement">Height</label>
            <span>{pokemonData?.height}</span>
          </div>
          <div className="eggGrp">
            <label className="measurement">Egg Group</label>
            <span>{eggGroup}</span>
          </div>
          <div className="hW-sec">
            <label className="measurement">Weight</label>
            <span>{pokemonData?.weight}</span>
          </div>
        </section>
        <section className="hW-section">
          <div className="hW-sec">
            <label className="measurement">Ability</label>
            <div className="typePill">
              <span>{ability}</span>
            </div>
          </div>
          <div className="pills hW-sec">
            <label className="measurement">Types</label>
            <div className="type-pill">
              {pokemonData.types.map((p) => {
                return (
                  <p
                    style={{
                      backgroundColor: `${typeColor[p.type.name]}`,
                    }}
                    className="pill"
                  >
                    {p.type.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <label className="measurement">Week Against</label>
            <div className="type-pill">
              {noDamage.map((t) => {
                return (
                  <p
                    style={{
                      backgroundColor: `${typeColor[t]}`,
                    }}
                    className="pill"
                  >
                    {t}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      </Modal>
      <Modal className="text-modal testModalm" isOpen={isFullDiscription}>
        <CrossSvgr
          className="btn-txtModal"
          onClick={() => setIsFullDiscription(false)}
        />
        <div>{discription}</div>
      </Modal>
    </>
  );
}
export default ModalHero;
