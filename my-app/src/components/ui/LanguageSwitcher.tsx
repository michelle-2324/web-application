import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('zh')}
        className={`px-4 py-2 rounded ${i18n.language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitcher;