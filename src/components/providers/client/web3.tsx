'use client';

import React, { useMemo } from 'react';

import type { PropsWithChildren } from 'react';

import {
  darkTheme,
  getDefaultConfig,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { rainbowkitBurnerWallet } from 'burner-connector';
import { useTheme } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

import { env } from '@/env';

const { wallets: defaultWallets } = getDefaultWallets();

const wagmiConfig = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [
    ...defaultWallets,
    {
      groupName: 'More',
      wallets: [trustWallet, ledgerWallet, rainbowkitBurnerWallet]
    }
  ],
  chains: [mainnet, sepolia],
  ssr: true
});

const queryClient = new QueryClient();

type TWeb3Provider = PropsWithChildren;

export default function Web3Provider({ children }: Readonly<TWeb3Provider>) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = useMemo(() => resolvedTheme === 'dark', [resolvedTheme]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={
            isDarkTheme
              ? darkTheme({ borderRadius: 'small' })
              : lightTheme({ borderRadius: 'small' })
          }
        >
          {children}

          <ReactQueryDevtools initialIsOpen={false} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
