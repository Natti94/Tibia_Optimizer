function Spells({ main }) {
  if (!main.vocation) {
    return <p>Please select a vocation to view spells.</p>;
  }

  return (
    <div>
      <h2>Spells</h2>
      <div className={`vocation-content${main.vocation ? " show" : ""}`}></div>
    </div>
  );
}

export default Spells;
