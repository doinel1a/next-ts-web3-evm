'use client';

import '@rainbow-me/rainbowkit/styles.css';

import type { ComponentProps } from 'react';

import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { cn } from '@/lib/utils';

import WalletDropdown from './dropdown';

type TWallet = ComponentProps<'button'>;

export default function Wallet({ className }: TWallet) {
  const { isConnected, isDisconnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return <WalletDropdown />;
  }

  if (isDisconnected) {
    return (
      <Button color='primary' className={cn('w-32', className)} onPress={openConnectModal}>
        Connect Wallet
      </Button>
    );
  }

  return <Skeleton className='h-10 w-32 rounded-md' />;
}
