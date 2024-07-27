import React from "react";

interface Tab {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

interface TabbarProps {
  tabs: Tab[];
  currentTab: string;
  onTabClick: (id: string) => void;
}

const Tabbar: React.FC<TabbarProps> = ({tabs, currentTab, onTabClick}) => {
  return (
    <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
      <ul className='flex flex-wrap -mb-px'>
        {tabs.map(({id, text}) => (
          <li key={id} className='me-2'>
            <a
              href='#'
              onClick={() => onTabClick(id)}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                id === currentTab
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              aria-current={id === currentTab ? "page" : undefined}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabbar;
