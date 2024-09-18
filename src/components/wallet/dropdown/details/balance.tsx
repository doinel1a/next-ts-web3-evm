'use client';

import React, { useMemo } from 'react';

import type { Address } from 'viem';

import { formatUnits } from 'viem';
import { useBalance } from 'wagmi';

import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

import Label from '../commons/label';

type TENSName = {
  address: Address | undefined;
};

export default function Balance({ address }: TENSName) {
  const { data: walletBalance } = useBalance({ address });

  const displayWalletBalance = useMemo(
    () =>
      `${formatUnits(walletBalance?.value ?? 0n, walletBalance?.decimals ?? 0)} ${walletBalance?.symbol}`,
    [walletBalance]
  );
  const truncatedDisplayWalletBalance = useMemo(
    () =>
      `${formatUnits(walletBalance?.value ?? 0n, walletBalance?.decimals ?? 0).slice(0, 4)} ${walletBalance?.symbol}`,
    [walletBalance]
  );

  return (
    <DropdownMenuLabel>
      <Label
        title={displayWalletBalance}
        property='Balance'
        value={truncatedDisplayWalletBalance}
      />
    </DropdownMenuLabel>
  );
}
