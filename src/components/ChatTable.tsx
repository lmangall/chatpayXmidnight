import React, {useState, useEffect} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import AgreeSale from "./Modals/AgreeSale";
import {useUserContext} from "../utils/utils";

interface ChatTableProps {
  backendUrl: string;
}

const ChatTable: React.FC<ChatTableProps> = ({backendUrl}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );

    const newSelectedChats = selectedValues.reduce(
      (acc, id) => {
        const chat = user.chatsToSellUnfolded?.find(
          item => String(item.userId) === id,
        );
        if (chat) {
          const key = `(${String(chat.userId)}, '${chat.userName}')`;
          acc[key] = chat.words;
        }
        return acc;
      },
      {} as {[key: string]: number},
    );

    console.log("ChatTable handleSubmit selectedChats", newSelectedChats);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum +
      (user.chatsToSellUnfolded?.find(item => String(item.userId) === id)
        ?.words || 0),
    0,
  );

  useEffect(() => {
    // This ensures that the component re-renders when the user changes
    // and updates the selectedChats and totalValue accordingly.
  }, [user]);

  return (
    <div className='text-left'>
      {user.chatsToSellUnfolded?.map(item => (
        <Cell
          key={item.userId}
          Component='label'
          before={
            <Multiselectable
              name='multiselect'
              value={String(item.userId)}
              checked={selectedValues.includes(String(item.userId))}
              onChange={() => handleSelectionChange(String(item.userId))}
            />
          }
          multiline
        >
          <strong>{item.words} $Words </strong> - {item.userName}
        </Cell>
      ))}
      <table className='mt-5 w-full text-center'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <strong> Total Value: {totalValue} $Words </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='text-center '>
        <AgreeSale
          selectedChats={selectedValues.reduce(
            (acc, id) => {
              const chat = user.chatsToSellUnfolded?.find(
                item => String(item.userId) === id && item.status != "pending",
              );
              if (chat) {
                acc[`(${String(chat.userId)}, '${chat.userName}')`] =
                  chat.words;
              }
              return acc;
            },
            {} as {[key: string]: number},
          )}
          phoneNumber={phoneNumber}
          onClose={() => {}}
          isVisible={true} // This prop can be removed if not used inside AgreeSale
          backendUrl={backendUrl}
        />
      </div>
    </div>
  );
};

export default ChatTable;
