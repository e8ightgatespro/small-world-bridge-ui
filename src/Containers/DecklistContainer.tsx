import { FunctionComponent, useState } from "react";
import { Card } from "../Models/Card";
import DisplayDecklist from "../Components/DisplayDecklist/DisplayDecklist";

interface DecklistContainerProps {
    
}

const DecklistContainer: FunctionComponent<DecklistContainerProps> = () => {
  const [deck, setDeck] = useState<Card[]>([]);
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
    <div>
      <DisplayDecklist
        deck={deck}
        onCloseButtonClick={handleRemoveCardFromDeck}
        onRowClick={handleSelectCard}
      />
      <DisplayCard card={selectedCard} onCloseButtonClick={closeCardDisplay} />
      <AddToDeck onAddCard={handleAddCardToDeck} />
    </div>
  );
};

export default DecklistContainer;
