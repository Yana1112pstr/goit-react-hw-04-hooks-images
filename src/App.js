import React, { Component } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchAPI from "./services/api";
import LoaderBall from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    page: 1,
    status: "idle",
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.setState({ images: [], status: "pending" });

      this.onFetchImg(1);
    }
  }

  onLoadMore = async () => {
    const { page } = this.state;
    this.setState({ status: "pending" });

    this.onFetchImg(page);
  };

  onFetchImg = async (pageQuery) => {
    const { searchQuery } = this.state;
    try {
      const { hits } = await fetchAPI(searchQuery, pageQuery);
      if (hits.length === 0) {
        throw new Error(`not images`);
      }
      if (hits.length < 12) {
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
        }));
        throw new Error(`not more images`);
      }
      this.setState((prevState) => ({
        status: "resolved",
        images: [...prevState.images, ...hits],
        page: pageQuery + 1,
      }));
    } catch (error) {
      toast.error(error.message);
      this.setState({ error, status: "idle" });
    }
  };

  handleChangeQuery = (searchQuery) => {
    this.setState({ searchQuery });
  };

  toggleModal = (largeImage) => {
    this.setState((prevState) => ({
      largeImage,
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { handleChangeQuery, toggleModal, onLoadMore } = this;
    const { status, images, showModal, largeImage } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={handleChangeQuery} />
        {status === "pending" && <LoaderBall />}
        <ImageGallery images={images} onClick={toggleModal} />
        {status === "resolved" && <Button onClick={onLoadMore} />}
        {showModal && <Modal largeImage={largeImage} onClick={toggleModal} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
