import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchbar";
import ImageGallery from "./components/imageGallery";
import Button from "./components/button";
import getQuery from "./api/getQuery";
import { Loading } from "notiflix";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    if (status === "idle") {
      setStatus("pending");
      const fetchImages = async () => {
        try {
          const images = await getQuery(query, page);
          if (!images.length) {
            throw new Error(`No search results for ${query}`);
          }
          setImages((prevImages) => [...prevImages, ...images]);
          setStatus("resolved");
          Loading.remove();

          page > 1 &&
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
        } catch (error) {
          setError(error);
          setStatus("rejected");
          Loading.remove();
        }
      };
      fetchImages();
    }
  }, [images, query, page, status]);

  const addQuery = (text) => {
    setQuery(text);
    setPage(1);
    setImages([]);
    setStatus("idle");
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setStatus("idle");
  };

  return (
    <div className="App">
      <SearchBar onSubmit={addQuery} />
      {status === "rejected" && <h1>{error.message}</h1>}
      <ImageGallery images={images} />
      {status === "pending" && Loading.dots()}
      {status === "resolved" && images.length >= 12 && (
        <Button onLoadMore={onLoadMore} />
      )}
    </div>
  );
};

export default App;
