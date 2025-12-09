import type { RootState } from '@/stores/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageToGoogleGenAi } from '../api/googleGenAI';

export interface ChatMessage {
  index: number;
  message: string;
  isBot: boolean;
}

interface ChatbotState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatbotState = {
  messages: [
    { index: 0, message: 'Hello, I am IA Assistant. How can I help you today?', isBot: true },
  ],
  loading: false,
  error: null,
};

export const sendChatMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async (userMessage: string, { rejectWithValue }) => {
    try {
      const response = await sendMessageToGoogleGenAi(userMessage);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get response from Perplexity';
      return rejectWithValue(errorMessage);
    }
  }
);

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ index: state.messages.length, message: action.payload, isBot: false });
    },
    clearMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.messages.push({ index: state.messages.length, message: action.payload, isBot: true });
        state.loading = false;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, clearMessages } = chatbotSlice.actions;

export const selectMessages = (state: RootState) => state.chatbot.messages;
export const selectLoading = (state: RootState) => state.chatbot.loading;
export const selectError = (state: RootState) => state.chatbot.error;

export default chatbotSlice.reducer;
