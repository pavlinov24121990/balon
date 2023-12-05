import { createContext, ReactNode, useContext, useState } from 'react';

interface FlashContextProps {
  children: ReactNode;
}

interface FlashContextValue {
  message: string | null;
  showMessage: (message: string) => void;
  clearMessage: () => void;
}

const FlashContext = createContext<FlashContextValue | undefined>(undefined);

export const FlashProvider: React.FC<FlashContextProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const value: FlashContextValue = {
    message,
    showMessage,
    clearMessage,
  };

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>;
};

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};
