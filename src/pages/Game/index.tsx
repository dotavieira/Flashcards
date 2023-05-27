import "./style.css";
import Card from "../../components/Card";
import Xp from "../../components/Xp";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";

const Game = () => {
  const { getXP, xp } = useContext(UserContext);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(false);
    getXP();
    setHasLoaded(true);
  }, []);

  const [cards, setCards] = useState([
    {
      front: "Gato",
      back: "Cat",
    },
    {
      front: "Vaca",
      back: "Cow",
    },
    {
      front: "Cachorro",
      back: "Dog",
    },
  ]);

  return (
    <>
      <div id="container-topo">
        <div className="titulo">FlashCard Challenge</div>
        {hasLoaded && <Xp total={xp} />}
      </div>
      {hasLoaded && (
        <div id="container-cards">
          {cards.map((card, index) => (
            <Card content={card} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Game;
