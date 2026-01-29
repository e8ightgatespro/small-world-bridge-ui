import { Card } from "../../Models/Card";
import "./DisplayCard.scss";

interface DisplayCardProps {
  card: Card | null;
  closeCard: () => void;
}

export default function DisplayCard({ card, closeCard }: DisplayCardProps) {
  if (!card) {
    return <div className="DisplayCard">Select a card to display</div>;
  }

    return (
    <div className="DisplayCard">
        <h2>{card.name}</h2>
        <div>
            <p><strong>Race:</strong> {card.race}</p>
            <p><strong>Attribute:</strong> {card.attribute}</p>
            <p><strong>Level:</strong> {card.level}</p>
            <p><strong>ATK:</strong> {card.atk}</p>
            <p><strong>DEF:</strong> {card.def}</p>
        </div>
        <button onClick={closeCard}>Close</button>
        </div>
    );
}