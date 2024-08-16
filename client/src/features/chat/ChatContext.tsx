import { createContext, ReactNode, useContext, useReducer } from "react";
import { Contact } from "./schema";

type ChatValue = {
  unselectChat(): void;
  selectUser(obj: Contact): void;
  selectChannel(obj: {}): void;
} & ChatState;

type ChatState =
  | {
      currentChat: "none";
      active: undefined;
    }
  | {
      currentChat: "contact";
      active: Contact;
    }
  | {
      currentChat: "channel";
      active: {};
    };

interface ChatProviderProps {
  children: ReactNode;
}

type Unselect = {
  type: "UNSELECT";
};

type SelectUser = {
  type: "SELECT_USER";
  payload: { currentChat: "contact"; active: Contact };
};
type SelectChannel = {
  type: "SELECT_CHANNEL";
  payload: { currentChat: "channel"; active: {} };
};

type ACTION = Unselect | SelectUser | SelectChannel;

const ChatContextProvider = createContext<ChatValue>({} as ChatValue);

function reducer(state: ChatState, action: ACTION): ChatState {
  switch (action.type) {
    case "UNSELECT":
      return {
        ...state,
        currentChat: "none",
        active: undefined,
      };
    case "SELECT_USER":
      return {
        ...state,
        active: action.payload.active,
        currentChat: action.payload.currentChat,
      };
    case "SELECT_CHANNEL":
      return {
        ...state,
        active: action.payload.active,
        currentChat: action.payload.currentChat,
      };
    default:
      return state;
  }
}

const initialState: ChatState = {
  active: undefined,
  currentChat: "none",
};
export default function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function unselectChat() {
    dispatch({ type: "UNSELECT" });
  }
  function selectUser(obj: Contact) {
    dispatch({
      type: "SELECT_USER",
      payload: {
        active: obj,
        currentChat: "contact",
      },
    });
  }

  function selectChannel(obj: {}) {
    dispatch({
      type: "SELECT_CHANNEL",
      payload: {
        active: obj,
        currentChat: "channel",
      },
    });
  }
  return (
    <ChatContextProvider.Provider
      value={
        {
          unselectChat,
          active: state.active,
          currentChat: state.currentChat,
          selectChannel,
          selectUser,
        } as ChatValue
      }
    >
      {children}
    </ChatContextProvider.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContextProvider);
  if (!context) throw new Error("Cannot use useChat outside of Chat Provider");
  return context;
}
