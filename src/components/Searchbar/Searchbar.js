import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: "",
  };

  handleChangeInput = (e) => {
    const { value } = e.currentTarget;
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      toast.error("enter your request!");
      return;
    }
    const { searchQuery } = this.state;
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    const { searchQuery } = this.state;
    const { handleChangeInput } = this;
    return (
      <header className={s.SearchBar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
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
}

export default SearchBar;
