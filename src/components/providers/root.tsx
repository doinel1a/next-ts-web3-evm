import React from 'react';

import type { PropsWithChildren } from 'react';

import HeroUiProvider from './hero-ui';
import ThemeProvider from './theme';
import Web3Provider from './web3';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <HeroUiProvider>
      <ThemeProvider>
        <Web3Provider>{children}</Web3Provider>
      </ThemeProvider>
    </HeroUiProvider>
  );
}
