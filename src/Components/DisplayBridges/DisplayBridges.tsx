import "./DisplayBridges.scss";
import { useState } from "react";
import { Card } from "../../Models/Card";

interface DisplayBridgesProps {
  deck: Card[];
}

export function DisplayBridges({ deck }: DisplayBridgesProps) {
  const [bridges, setBridges] = useState<any[]>([]);
  const [fetchingBridges, setFetchingBridges] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [addToHandFilter, setAddToHandFilter] = useState<string>("");
  const [banishFromDeckFilter, setBanishFromDeckFilter] = useState<string>("");
  const [revealFromHandFilter, setRevealFromHandFilter] = useState<string>("");

  async function fetchBridges() {
    setFetchingBridges(true);
    setAddToHandFilter("");
    setBanishFromDeckFilter("");
    setRevealFromHandFilter("");
    setSortConfig(null);

    const res = await fetch("/bridge/getBridgesInDeck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deck),
    });
    const data = await res.json();
    setBridges(data);
    setFetchingBridges(false);
  }

  if (fetchingBridges) {
    return <div className="Bridges">Loading bridges...</div>;
  }

  const sortedBridges = sortConfig
    ? [...bridges].sort((a, b) => {
        const aVal =
          sortConfig.key === "cardToAdd"
            ? a.cardToAdd.name
            : sortConfig.key === "cardToBanish"
              ? a.cardToBanish.name
              : a.cardToReveal.name;
        const bVal =
          sortConfig.key === "cardToAdd"
            ? b.cardToAdd.name
            : sortConfig.key === "cardToBanish"
              ? b.cardToBanish.name
              : b.cardToReveal.name;
        return sortConfig.direction === "ascending"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      })
    : bridges;

  const filteredAndSortedBridges = sortedBridges !== undefined ? sortedBridges.filter((bridge) => {
    const addToHandMatch =
      addToHandFilter === "" ||
      bridge.cardToAdd.name
        .toLowerCase()
        .includes(addToHandFilter.toLowerCase());
    const banishFromDeckMatch =
      banishFromDeckFilter === "" ||
      bridge.cardToBanish.name
        .toLowerCase()
        .includes(banishFromDeckFilter.toLowerCase());
    const revealFromHandMatch =
      revealFromHandFilter === "" ||
      bridge.cardToReveal.name
        .toLowerCase()
        .includes(revealFromHandFilter.toLowerCase());
    return (addToHandMatch && banishFromDeckMatch && revealFromHandMatch);
  }) : [];

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) =>
      prevConfig?.key === key && prevConfig.direction === "ascending"
        ? { key, direction: "descending" }
        : { key, direction: "ascending" },
    );
  };

  return (
    <div className="Bridges">
      <div>
        <button onClick={() => fetchBridges()}>Fetch Bridges</button>
        <table className="BridgesTable">
          <thead className="BridgesTableHeader">
            <tr>
              <th className="table-cell">
                Card To Add
                <input
                  type="text"
                  onChange={(e) => setAddToHandFilter(e.target.value)}
                ></input>
                <button onClick={() => handleSort("cardToAdd")}>
                  {sortConfig?.key === "cardToAdd" &&
                  sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"}
                </button>
              </th>
              <th className="table-cell">
                Card To Banish
                <input
                  type="text"
                  onChange={(e) => setBanishFromDeckFilter(e.target.value)}
                ></input>
                <button onClick={() => handleSort("cardToBanish")}>
                  {sortConfig?.key === "cardToBanish" &&
                  sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"}
                </button>
              </th>
              <th className="table-cell">
                Card To Reveal
                <input
                  type="text"
                  onChange={(e) => setRevealFromHandFilter(e.target.value)}
                ></input>
                <button onClick={() => handleSort("cardToReveal")}>
                  {sortConfig?.key === "cardToReveal" &&
                  sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBridges.length > 0 && filteredAndSortedBridges.map((bridge, index) => (
              <tr key={index} className="BridgesTableRow">
                <td className="table-cell">{bridge.cardToAddToHand.name}</td>
                <td className="table-cell">{bridge.cardToRevealInDeck.name}</td>
                <td className="table-cell">{bridge.cardToRevealInHand.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
