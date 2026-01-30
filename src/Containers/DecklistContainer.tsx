import { FunctionComponent, useState } from "react";
import { Card } from "../Models/Card";
import DisplayDecklist from "../Components/DisplayDecklist/DisplayDecklist";
import DisplayCard from "../Components/DisplayCard/DisplayCard";
import AddToDeck from "../Components/AddToDeck/AddToDeck";
import "./DecklistContainer.scss";

interface DecklistContainerProps {
    deck: Card[];
    setDeck: (deck: Card[]) => void;
}

const DecklistContainer: FunctionComponent<DecklistContainerProps> = ({ deck, setDeck }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  function handleAddCardToDeck(card: Card) {
    setDeck([...deck, card]);
  }

  function handleRemoveCardFromDeck(index: number) {
    const newDeck = deck.filter((_, i) => i !== index);
    setDeck(newDeck);
  }

  function handleSelectCard(card: Card) {
    setSelectedCard(card);
  }

  function closeCardDisplay() {
    setSelectedCard(null);
  }

  return (
    <div className="DeckListContainer">
      <DisplayDecklist
        deck={deck}
        onCloseButtonClick={handleRemoveCardFromDeck}
        onRowClick={handleSelectCard}
      />
      <DisplayCard card={selectedCard} closeCard={closeCardDisplay} />
      <AddToDeck onAddCard={handleAddCardToDeck} />
    </div>
  );
};

export default DecklistContainer;
