import React, { ReactNode, useState } from 'react';

type TokenContextValue = {
  tokenExpirationDate?: Date;
  onChangeExpirationDate: (newDate: Date) => void;
};

export const TokenContext = React.createContext<TokenContextValue>({
  tokenExpirationDate: undefined,
  onChangeExpirationDate: (newDate: Date) => {
    // eslint-disable-next-line no-console
    console.log(newDate);
  }
});

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [expirationDate, setExpirationDate] = useState<Date>();

  const onChangeExpirationDate = (newDate: Date) => {
    setExpirationDate(newDate);
  };

  return (
    <TokenContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ tokenExpirationDate: expirationDate, onChangeExpirationDate }}
    >
      {children}
    </TokenContext.Provider>
  );
};
