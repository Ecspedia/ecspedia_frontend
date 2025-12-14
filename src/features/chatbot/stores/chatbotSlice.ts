import type { RootState } from '@/stores/store';
import { ChatResponseDto, ChatResponseType } from '@/types/graphql';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageToApi } from '../api/sendMessageApi';

export interface ChatMessage {
  index: number;
  message: string;
  isBot: boolean;
  data?: unknown;
  typeOf?: ChatResponseType;
}

interface ChatbotState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  isExpanded: boolean;
}

const initialState: ChatbotState = {
  messages: [
    {
      index: 0,
      message:
        'Hello, I’m a hotel assistant. I can search for hotels, answer questions about specific hotels, and help you make bookings. How can I help you?',
      isBot: true,
    },
  ],
  loading: false,
  error: null,
  isExpanded: false,
};

export const sendChatMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async (userMessage: string, { rejectWithValue }) => {
    try {
      const response = await sendMessageToApi(userMessage);
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
    toggleIsExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        const data: ChatResponseDto = action.payload;

        switch (data.chatResponseType) {
        
          case ChatResponseType.SearchResults:
            const hotels = data.searchData;
            //Only get 5 hotels for the momemnts
            const top5Hotels = hotels?.slice(0, 5);
            state.messages.push({
              index: state.messages.length,
              message: '',
              data: top5Hotels,
              isBot: true,
              typeOf: ChatResponseType.SearchResults,
            });
            break;
          case ChatResponseType.QuestionAnswer:
            const question = data.questionData;
            state.messages.push({
              index: state.messages.length,
              message: question ?? 'error try again',
              isBot: true,
              typeOf: ChatResponseType.QuestionAnswer,
            });
            break;
          case ChatResponseType.Booking:
            const booking = data.bookingData;
            state.messages.push({
              index: state.messages.length,
              message: booking ?? 'error try again',
              isBot: true,
              typeOf: ChatResponseType.Booking,
            });
            break;
          case ChatResponseType.Other:
            const other = data.otherData;
            state.messages.push({
              index: state.messages.length,
              message: other ?? 'error try again',
              isBot: true,
              typeOf: ChatResponseType.Other,
            });
            break;
          case ChatResponseType.Error:
            const error = data.errorData;
            state.messages.push({
              index: state.messages.length,
              message: error ?? 'error try again',
              isBot: true,
              typeOf: ChatResponseType.Error,
            });
            break;
          default:
            break;
        }

        state.loading = false;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, clearMessages, toggleIsExpanded } = chatbotSlice.actions;

export const selectMessages = (state: RootState) => state.chatbot.messages;
export const selectLoading = (state: RootState) => state.chatbot.loading;
export const selectError = (state: RootState) => state.chatbot.error;
export const selectIsExpanded = (state: RootState) => state.chatbot.isExpanded;

export default chatbotSlice.reducer;
