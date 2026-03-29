import axios from 'axios';

// Using MyMemory Translation API (free, no API key required)
const TRANSLATION_API = 'https://api.mymemory.translated.net/get';

export const translateText = async (text, sourceLang, targetLang) => {
  if (!text || text.trim() === '') return '';

  try {
    const response = await axios.get(TRANSLATION_API, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`
      }
    });

    if (response.data && response.data.responseData) {
      return response.data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export const translateEnglishToUkrainian = async (text) => {
  return await translateText(text, 'en', 'uk');
};

export const translateUkrainianToEnglish = async (text) => {
  return await translateText(text, 'uk', 'en');
};
