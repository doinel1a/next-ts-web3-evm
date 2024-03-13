'use client';

import '@rainbow-me/rainbowkit/styles.css';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import WalletDropdown from './dropdown';

export default function Wallet() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return <WalletDropdown />;
  }

  return (
    <Button color='primary' onClick={openConnectModal}>
      Connect Wallet
    </Button>
  );
}
