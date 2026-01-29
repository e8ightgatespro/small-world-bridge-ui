import { Card } from "../../Models/Card";
import { Attribute } from "../../Models/Enums/Attribute";
import { Race } from "../../Models/Enums/Race";
import { FunctionComponent, useState } from "react";

interface AddToDeckProps {
  onAddCard: (card: Card) => void;
}

const AddToDeck: FunctionComponent<AddToDeckProps> = ({ onAddCard }) => {
  const [cardName, setCardName] = useState<string>("");
  const [cardType, setCardType] = useState<Race>();
  const [cardAttribute, setCardAttribute] = useState<Attribute>();
  const [cardLevel, setCardLevel] = useState<number>(0);
  const [cardAtk, setCardAtk] = useState<number>(0);
  const [cardDef, setCardDef] = useState<number>(0);
  const [questionMarkAtk, setQuestionMarkAtk] = useState<boolean>(false);
  const [questionMarkDef, setQuestionMarkDef] = useState<boolean>(false);
  function handleAddCard() {
    const newCard: Card = new Card(
      cardName,
      cardType!,
      cardAttribute!,
      cardLevel,
      questionMarkAtk ? "?" : cardAtk,
      questionMarkDef ? "?" : cardDef,
    );
    onAddCard(newCard);
  }

  return (
    <div style={{ justifySelf: "center", marginTop: "auto", padding: "10px" }}>
      <div className="fieldGroup">
        <div className="individualField">
          <label>Card Name:</label>
          <input
            type="text"
            placeholder="Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="individualField">
          <label>Card Type:</label>
          <select onChange={(e) => setCardType(e.target.value as Race)}>
            {Object.values(Race).map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
        <div className="individualField">
          <label>Card Attribute:</label>
          <select
            onChange={(e) => setCardAttribute(e.target.value as Attribute)}
          >
            {Object.values(Attribute).map((attribute) => (
              <option key={attribute} value={attribute}>
                {attribute}
              </option>
            ))}
          </select>
        </div>
        <div className="individualField">
          <label>Card Level:</label>
          <input
            style={{ maxHeight: "max-content" }}
            type="number"
            min={1}
            max={12}
            placeholder="Level"
            value={cardLevel}
            onChange={(e) => setCardLevel(parseInt(e.target.value))}
          />
        </div>

        <div className="fieldGroup" style={{ display: "block" }}>
          <div className="individualField">
            <label>Card ATK:</label>
            <input
              style={{ maxHeight: "max-content" }}
              type="number"
              min={0}
              placeholder="ATK"
              value={cardAtk}
              onChange={(e) => setCardAtk(parseInt(e.target.value))}
              disabled={questionMarkAtk}
            />
          </div>
          <div className="individualField">
            <label>Has ? ATK:</label>
            <input
              type="checkbox"
              checked={questionMarkAtk}
              onChange={(e) => setQuestionMarkAtk(e.target.checked)}
            />
          </div>
        </div>

        <div className="fieldGroup" style={{ display: "block" }}>
          <div className="individualField">
            <label>Card DEF:</label>
            <input
              style={{ maxHeight: "max-content" }}
              type="number"
              min={0}
              placeholder="DEF"
              value={cardDef}
              onChange={(e) => setCardDef(parseInt(e.target.value))}
              disabled={questionMarkDef}
            />
          </div>
          <div className="individualField">
            <label>Has ? DEF:</label>
            <input
              type="checkbox"
              checked={questionMarkDef}
              onChange={(e) => setQuestionMarkDef(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="individualField">
        <button style={{ width: "auto" }} onClick={handleAddCard}>
          Add Card to Deck
        </button>
      </div>
    </div>
  );
};

export default AddToDeck;
