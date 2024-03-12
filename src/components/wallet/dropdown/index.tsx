import React, { useMemo, useState } from 'react';

import { Button } from '@nextui-org/button';
import { useAccount } from 'wagmi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import CopyAddress from './actions/copy-address';
import Balance from './details/balance';
import ENSName from './details/ens-name';
import Network from './details/network';

export default function WalletDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { address } = useAccount();
  const displayAddress = useMemo(
    () => `${address?.slice(0, 8)}...${address?.slice(-8)}`,
    [address]
  );

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          color='default'
          onClick={() => setIsDropdownOpen((previousState) => !previousState)}
        >
          {displayAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Details</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ENSName address={address} />
          <Balance address={address} />
          <Network />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CopyAddress address={address} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
