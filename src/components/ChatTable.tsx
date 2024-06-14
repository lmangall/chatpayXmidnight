import React, {useState} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import AgreeSale from "./Modals/AgreeSale";

interface ChatTableProps {
  onSelectionChange: (selected: {[key: string]: number}[]) => void;
  selectedChats: {[key: string]: number}[];
}

const ChatTable: React.FC<ChatTableProps> = ({
  onSelectionChange,
  selectedChats,
}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [, setShowAgreeSale] = useState<boolean>(false);
  //   const [selectedChats, setSelectedChats] = useState<{[key: string]: number}[]>(
  //     [],
  //   );

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
    // Update selectedChats based on selectedValues
    const newSelectedChats = selectedValues
      .map(id => {
        const chat = user.chats.find(item => String(item.id) === id);
        if (chat) {
          const key = `(${String(chat.id)}, '${chat.name}')`;
          return {[key]: chat.words};
        }
        return null;
      })
      .filter(Boolean) as {[key: string]: number}[];

    console.log("ChatTable handleSubmit selectedChats", newSelectedChats);
    onSelectionChange(newSelectedChats);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // const newSelectedChats = selectedValues.reduce<{[key: string]: number}>(
    //   (acc, id) => {
    //     const chat = user.chats.find(item => String(item.id) === id);
    //     if (chat) {
    //       acc[`(${String(chat.id)}, '${chat.name}')`] = chat.words;
    //     }
    //     return acc;
    //   },
    //   {},
    // );

    // setSelectedChats([newSelectedChats]);

    setShowAgreeSale(true);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum + (user.chats.find(item => String(item.id) === id)?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";
  console.log("ChatTable rendered with selected chats:", selectedChats);

  return (
    <div style={{textAlign: "left"}}>
      <form onSubmit={handleSubmit}>
        {user.chats.map(item => (
          <Cell
            key={item.id}
            Component='label'
            before={
              <Multiselectable
                name='multiselect'
                value={String(item.id)}
                checked={selectedValues.includes(String(item.id))}
                onChange={() => handleSelectionChange(String(item.id))}
              />
            }
            multiline
          >
            <strong>{item.words} Points </strong> - {item.name}
          </Cell>
        ))}
      </form>

      {selectedValues.length > 0 && (
        <table
          style={{
            marginTop: "20px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr>
              <td colSpan={2}>
                <strong> Total Value: {totalValue} Points </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <AgreeSale
        selectedChats={selectedChats}
        phoneNumber={phoneNumber}
        onClose={() => setShowAgreeSale(false)}
      />

      {selectedValues.length > 0 && (
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <button type='submit' onClick={handleSubmit}>
            Next step
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatTable;
