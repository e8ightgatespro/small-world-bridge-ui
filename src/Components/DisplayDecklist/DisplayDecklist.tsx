import { FunctionComponent } from "react";
import { Card } from "../../Models/Card";
import "./DisplayDecklist.scss";

interface DisplayDecklistProps {
  deck: Card[];
  onCloseButtonClick: (index: number) => void;
  onRowClick: (card: Card) => void;
}

const DisplayDecklist: FunctionComponent<DisplayDecklistProps> = ({
  deck,
  onCloseButtonClick,
  onRowClick,
}) => {

  return (
    <div> Deck List
      <table className="DeckListTable">
        <tbody>
          {deck.map((card, index) => (
            <tr key={index} className="DeckListRow" onClick={() => onRowClick(card)}>
              <td className="DeckListCell">{card.name}</td>
              <td>
                <button className="CloseButton" aria-label="Close" onClick={() => onCloseButtonClick(index)}>
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayDecklist;
