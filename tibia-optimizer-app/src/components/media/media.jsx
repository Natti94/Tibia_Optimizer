import Video from "./content/video";
import News from "./content/news";
import "./media.css";

function Media() {
  const isProd = import.meta.env.PROD;

  return (
    <div className="media">
      <News />
      <Video />
    </div>
  );
}

export default Media;
