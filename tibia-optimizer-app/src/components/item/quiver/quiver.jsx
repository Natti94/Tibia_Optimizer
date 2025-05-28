import { useState, useEffect } from "react";
import { quiverList } from "../../../data/item/quiver/quiver";

function Quiver() {
  const [quiver, setQuiver] = {
    quiver: "",
  };
  const [totalAllResistance, setTotalAllResistance] = useState(0);
  const [totalSpecificResistance, setTotalSpecificResistance] = useState({});
  const [option, setOption] = useState(null);
  useEffect(() => {
    setOption(quiverList);
  }, []);
  const handleChange = (field) => (event) => {
    setQuiver((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const getQuiver = (type) => {
    return option ? option.filter((quiver) => quiver.type === type) : [];
  };

  const calculateTotals = () => {
    let resistanceOverallSum = 0;
    let resistanceSpecificSum = {};
  };

  Object.values(quiver).forEach((quiver) => {
    const selected = quiverList.find(
      (theQuiver) => theQuiver.name === quiverName
    );
  });
}

export default Quiver;
