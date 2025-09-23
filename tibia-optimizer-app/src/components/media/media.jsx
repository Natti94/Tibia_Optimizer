function Media() {
  const isProd = import.meta.env.PROD;
  const assets = {
    background: isProd
      ? `/api/getAsset?assets=background`
      : import.meta.env.VITE_CLOUDINARY_BACKGROUND,
    character: isProd
      ? `/api/getAsset?assets=character`
      : import.meta.env.VITE_CLOUDINARY_CHARACTER,
  };

  return (
    <div className="media">
      <video autoPlay loop muted className="playback-video">
        <source src={assets.playback_video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Media;
