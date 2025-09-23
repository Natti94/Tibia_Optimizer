import { useState } from "react";

function Media() {
  const [slide, setSlide] = useState(0);

  const isProd = import.meta.env.PROD;

  const assets = {
    playback_video: isProd
      ? `/api/getAsset?asset=playback_video`
      : import.meta.env.VITE_CLOUDINARY_PLAYBACK_VIDEO,
  };

  const newsArticles = [
    "News Article 1: Exciting updates coming soon!",
    "News Article 2: New features have been added.",
    "News Article 3: Stay tuned for more information.",
  ];

  const slideNews = () => {
    setSlide((prev) => (prev + 1) % 3);
  };

  return (
    <div>
      <div className="media">
        <div className="media-news">
          <h2>Latest News</h2>
          <div onClick={slideNews} className="media-news-articles">
            <p>{newsArticles[slide]}</p>
          </div>
          <div className="media-images">
            <span className="media-image-indicator">
              {`${slide + 1}/3`} {slide ? "»" : ""}
            </span>
            <img
              src={[slide]}
              alt={`News ${slide + 1}`}
              className="media-image"
            />
          </div>
        </div>
        <video autoPlay loop muted className="media-playback-video">
          <source
            src={assets.playback_video}
            type="video/mp4"
            autoPlay
            muted
            loop
          />
        </video>
      </div>
    </div>
  );
}

export default Media;
