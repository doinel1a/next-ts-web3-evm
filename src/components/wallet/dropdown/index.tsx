import React, { useMemo, useState } from 'react';

import { Button } from '@nextui-org/button';
import { useAccount } from 'wagmi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

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
      <DropdownMenuContent className='w-56'>Wallet Dropdown</DropdownMenuContent>
    </DropdownMenu>
  );
}
