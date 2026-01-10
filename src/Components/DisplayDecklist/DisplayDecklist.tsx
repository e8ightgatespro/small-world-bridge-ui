import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../../Models/Card";

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
    <div>
      <table>
        <tbody>
          {deck.map((card, index) => (
            <tr key={index} onClick={() => onRowClick(card)}>
              <td>{card.name}</td>
              <td>
                <button onClick={() => onCloseButtonClick(index)}>
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
