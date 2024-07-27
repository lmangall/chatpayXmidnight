import React, {useEffect} from "react";
import Chats from "./components/Chats";
import QuestMidnightMetadata from "./components/QuestMidnightMetadata";
import About from "./components/About";

import Tabbar from "./components/Tabbar";
import {useUserContext} from "./utils/utils";
import {UserProvider} from "./components/UserContext";
import chatpayLogo from "/public/chatpay_logo.png";
import midnightLogo from "/public/midnight_logo.png";
import cardanoLogo from "/public/cardano_logo.png";

const isProduction =
  import.meta.env.VITE_IS_PRODUCTION === "true" ||
  import.meta.env.VITE_IS_PRODUCTION === "1";

interface Tab {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

const tabs: Tab[] = [
  {id: "chats", text: "Chats"},
  {id: "quest", text: "Quest"},
  {id: "about", text: "About"},
];

const AppContent: React.FC = () => {
  const {user, currentTab, setCurrentTab} = useUserContext();
  const defaultTab = "welcome";

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
    const hasRedirectedToChats = sessionStorage.getItem("hasRedirectedToChats");

    if (user.chats.length > 0 && !hasRedirectedToChats) {
      console.log("User has chats, showing user's chats");
      setCurrentTab(tabs[0].id);
      sessionStorage.setItem("hasRedirectedToChats", "true");
    } else {
      setCurrentTab(defaultTab);
    }
  }, [user.id, user.chats.length, user.has_profile, setCurrentTab]);

  useEffect(() => {
    if (user.auth_status === "auth_code") {
      console.log(user.auth_status);
      console.log(
        "auth_status is auth_code, (means user went through /send-code) redirecting to login tab",
      );
      setCurrentTab(tabs[0].id);
    }
  }, [user.auth_status, setCurrentTab]);

  const handleTabClick = (id: string) => {
    setCurrentTab(id);
  };

  return (
    <div
      className='min-h-screen flex flex-col items-center'
      style={{backgroundColor: "#2da5e1"}}
    >
      <header className='w-full bg-blue-700 dark:bg-blue-800 text-white py-4'>
        <div className='container mx-auto text-center flex items-center justify-center'>
          <h1 className='text-2xl font-bold'>ChatPayXMidnight</h1>
        </div>
      </header>
      <Tabbar
        tabs={tabs}
        currentTab={currentTab || defaultTab}
        onTabClick={handleTabClick}
      />
      <div className='flex flex-1 container mx-auto mt-4'>
        <div className='w-full p-4 bg-white dark:bg-gray-800 rounded-lg'>
          {currentTab === "chats" && <Chats backendUrl={backendUrl} />}
          {currentTab === "quest" && <QuestMidnightMetadata />}
          {currentTab === "about" && <About />}
          {currentTab === defaultTab && (
            <div className='text-center'>
              <h2 className='text-3xl font-bold mb-4'>
                Welcome to ChatPayXMidnight
              </h2>
              <p className='text-lg mb-4'>Select a tab to get started.</p>
              <p className='text-lg mb-4'>
                ChatPay leverages Midnight ZK-SNARK from Midnight to better
                protect the privacy of its users and allow easy data bundling.
              </p>
              <div className='flex justify-center mt-4'>
                <img
                  src={chatpayLogo}
                  alt='ChatPay Logo'
                  className='h-36 mx-4'
                />
                <img
                  src={midnightLogo}
                  alt='Midnight Logo'
                  className='h-24 mx-4'
                />
                <img
                  src={cardanoLogo}
                  alt='Cardano Logo'
                  className='h-24 mx-4'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  console.log("isProduction: ", isProduction);

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
