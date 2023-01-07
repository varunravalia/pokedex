import React from "react";
import FilterSvgr from "../../../Icons/FilterSvgr";
import { MultiSelect } from "react-multi-select-component";
import "./Input.css";
const options = [
  { label: "NORMAL", value: "NORMAL" },
  { label: "FIGHTING", value: "FIGHTING" },
  { label: "FLYING", value: "FLYING" },
  { label: "POISION", value: "POISION" },
  { label: "GROUND", value: "GROUND" },
  { label: "ROCK", value: "ROCK" },
];
function Input(props) {
  return (
    <section className="Search-Section">
      <div className="SearchBar">
        <label className="search-text">Search by</label>
        <input
          type="text"
          className="InputWidth"
          placeholder="Name or Number"
          value={props.filterText}
          onChange={async (e) => await props.setFilterText(e.target.value)}
        />
        {/* <SearchSvgr className="SearchIcon" /> */}
      </div>
      <div className="Filter-icon">
        <FilterSvgr />
      </div>
      <section className="dropDwon">
        <div className="Multi-Sec">
          <label>Type</label>
          <MultiSelect
            options={options}
            value={props.attackType}
            onChange={props.setAttackType}
            labelledBy="Select"
            menuIsOpen={true}
          />
        </div>
        <div>
          <label>Gender</label>
          <select>
            <options value="Select" labelledBy="Select">
              Select
            </options>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select>
            <option>Hp</option>
          </select>
        </div>
      </section>
    </section>
  );
}
export default Input;
