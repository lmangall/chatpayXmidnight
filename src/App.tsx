import React, {useState, useEffect} from "react";
import {TwaAnalyticsProvider} from "@tonsolutions/telemetree-react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Word from "./components/Word";
import {Tabbar, IconButton} from "@telegram-apps/telegram-ui";
import {VscAccount} from "react-icons/vsc";
import logo from "./assets/logo_blink_whitebackground.gif";
import {UserProvider} from "./components/UserContext";
import {useUserContext} from "./utils/utils";

interface Tab {
  id: string;
  text: string;
}

const tabs: Tab[] = [
  {id: "home", text: "Home"},
  {id: "chats", text: "Chats"},
  {id: "social", text: "Social"},
  {id: "word", text: "Word"},
];

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);
  const {user} = useUserContext();

  const getBackendUrl = (): string => {
    const url = import.meta.env.VITE_BACKEND_URL;
    if (!url || typeof url !== "string") {
      throw new Error(
        "VITE_BACKEND_URL is not defined. Please set it in your environment variables.",
      );
    }
    return url;
  };

  const backendUrl: string = getBackendUrl();

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      console.log(
        "User doesn't have a profile but has at least one chat, showing OnboardUserB modal",
      );
    } else if (user.has_profile) {
      console.log("User has a profile, showing user's chats");
      setCurrentTab(tabs[1].id);
    } else if (!user.has_profile && user.chats.length === 0) {
      console.log(
        "User doesn't have a profile and doesn't have any chats, he just opened the app",
      );
      setCurrentTab(tabs[0].id);
    }
  }, [user]);

  console.log("User data:", user);
  console.log("User id:", user.id);
  console.log("User chats:", user.chats);

  return (
    <div>
      <div className='fixed top-0 w-full flex justify-between items-center bg-white z-1000 p-2'>
        <div className='flex-shrink-0'>
          <img src={logo} alt='Logo' className='w-36 h-auto' />
        </div>
        <div className='flex-shrink-0 text-right'>
          <IconButton mode='plain' size='l'>
            <VscAccount size={48} />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-col items-center p-5 max-w-full mx-auto text-center mt-24'>
        <div className='flex-1 w-full max-w-4xl'>
          {currentTab === "home" && (
            <Home setCurrentTab={setCurrentTab} backendUrl={backendUrl} />
          )}
          {currentTab === "chats" && <Chats backendUrl={backendUrl} />}
          {currentTab === "social" && <Social />}
          {currentTab === "word" && <Word />}
        </div>
      </div>
      <div className='fixed bottom-0 w-full bg-white z-1100'>
        <Tabbar>
          {tabs.map(({id, text}) => (
            <Tabbar.Item
              key={id}
              text={text}
              selected={id === currentTab}
              onClick={() => setCurrentTab(id)}
            />
          ))}
        </Tabbar>
      </div>
    </div>
  );
};

export function App() {
  return (
    <TwaAnalyticsProvider
      projectId='TELEMETREE_PROJECT_ID'
      apiKey='TELEMETREE_KEY'
      appName='ChatPay'
    >
      <UserProvider>
        <AppContent />
      </UserProvider>
    </TwaAnalyticsProvider>
  );
}

export default App;
