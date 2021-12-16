import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeInput = (e) => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("enter your request!");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={s.SearchBar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <ImSearch />
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          onChange={handleChangeInput}
          value={searchQuery}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
