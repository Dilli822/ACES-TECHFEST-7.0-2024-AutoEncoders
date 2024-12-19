import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslation = async () => {
    const url = 'https://libretranslate.de/translate'; // LibreTranslate API URL

    try {
      const response = await axios.post(url, {
        q: inputText,
        source: 'en',  // Source language: English
        target: 'ne',  // Target language: Nepali
        format: 'text',
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <h1>English to Nepali Translator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type in English"
      ></textarea>
      <button onClick={handleTranslation}>Translate</button>
      <div>
        <h2>Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default Translator;
