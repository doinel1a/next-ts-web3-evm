'use client';

import React, { useMemo } from 'react';

import type { Address } from 'viem';

import { formatUnits } from 'viem';
import { useBalance } from 'wagmi';

import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

import Label from '../commons/label';

type TBalance = {
  address: Address | undefined;
};

export default function Balance({ address }: Readonly<TBalance>) {
  const { isFetching, data: balance } = useBalance({ address });

  const walletBalance = useMemo(
    () => calculateBalance(balance?.value, balance?.decimals, balance?.symbol),
    [balance]
  );
  const truncatedWalletBalance = useMemo(
    () => calculateBalance(balance?.value, balance?.decimals, balance?.symbol, 4),
    [balance]
  );

  return (
    <DropdownMenuLabel>
      <Label
        title={walletBalance}
        property='Balance'
        value={truncatedWalletBalance}
        isLoading={isFetching && !balance}
      />
    </DropdownMenuLabel>
  );
}

function calculateBalance(
  value: bigint | undefined,
  decimals: number | undefined,
  symbol: string | undefined,
  truncateAt?: number
) {
  const _value = value ?? 0n;
  const _decimals = decimals ?? 0;
  const _symbol = symbol ?? 'ETH';
  const formattedValue = formatUnits(_value, _decimals);
  const truncatedValue = truncateAt ? formattedValue.slice(0, truncateAt) : formattedValue;
  return `${truncatedValue} ${_symbol}`;
}
