export const fetchChatHistory = (chatId) => async (dispatch) => {
    try {
      // const res = await someApi.getChat(chatId);
      // dispatch(setMessages(res.data));
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };
  
  