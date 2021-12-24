import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchAPI from "./services/api";
import LoaderBall from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

// status("idle"(start), "pending"(loading), "resolved"(success), "rejected"(error))

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStatus("pending");

    const onFetchImg = async (page) => {
      try {
        const { hits } = await fetchAPI(searchQuery, page);
        if (hits.length === 0) {
          throw new Error(`not images`);
        }
        if (hits.length < 12) {
          setImages((prevState) => [...prevState, ...hits]);
          throw new Error(`not more images`);
        }
        setStatus("resolved");
        setImages((prevState) => [...prevState, ...hits]);
      } catch (error) {
        toast.error(error.message);
        setStatus("idle");
      }
    };

    onFetchImg(page);
  }, [page, searchQuery]);

  const onLoadMore = () => {
    setStatus("pending");
    setPage((prevState) => prevState + 1);
  };

  const handleChangeQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const toggleModal = (largeImage) => {
    setLargeImage(largeImage);
    setShowModal((prevState) => !prevState);
  };

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

export default App;
