import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./carousel";

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async (limit) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log("Error while fetching", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages(8);
  }, []);

  return (
    <div className="main-container">
      <div className="carousel-container">
        <Carousel loading={loading} images={images} imagesPerSlide={2} />
      </div>
    </div>
  );
}

export default App;
