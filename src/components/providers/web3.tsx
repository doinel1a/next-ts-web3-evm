'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import { getDefaultConfig, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
      wallets: [argentWallet, trustWallet, ledgerWallet]
    }
  ],
  chains: [mainnet, sepolia],
  ssr: true
});

const queryClient = new QueryClient();

type TWeb3Provider = PropsWithChildren;

export default function Web3Provider({ children }: TWeb3Provider) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
