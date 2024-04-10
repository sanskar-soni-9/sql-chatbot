export default () => ({
  modelConfig: {
    magicPrompt: [
      {
        role: 'user',
        parts: [
          {
            text: process.env.MAGICAL_USER_PROMPT,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: process.env.MAGICAL_MODEL_PROMPT,
          },
        ],
      },
    ],
    apiKey: process.env.GEMINI_API_KEY,
    modelName: process.env.MODEL_NAME,
  },
});
