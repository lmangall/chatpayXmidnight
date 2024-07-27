import React, {useEffect, useCallback} from "react";
import {useUserContext} from "../utils/utils";
import Login from "./Login";

const Chats: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext();
  // const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (!user.has_profile) {
      // setActiveTab(user.chats.length > 0 ? "invitations" : "chats");
      console.log(
        "User does not have a profile, setting active tab to invitations",
      );
    } else {
      if (!isLoggedIn) {
        // setActiveTab("chats");
        console.log(
          "User has a profile, but is not logged in, setting active tab to chats",
        );
      }
    }
  }, [user, isLoggedIn]);

  const handleLoginSuccess = useCallback(() => {
    console.log("Login successful, setting showChatTable to true");
    // setShowChatTable(true);
  }, []);

  return <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />;
};

// Other components or code that use the Chats component can be placed here
const App: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  return (
    <div>
      <Chats backendUrl={backendUrl} />
      {/* Other components or elements can be included here */}
    </div>
  );
};

export default App;
