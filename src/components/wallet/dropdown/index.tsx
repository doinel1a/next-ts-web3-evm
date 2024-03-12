import React, { useMemo, useRef, useState } from 'react';

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
import QRCodeDialog from './actions/dialog/qrcode';
import Balance from './details/balance';
import ENSName from './details/ens-name';
import Network from './details/network';

export default function WalletDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRCodeDialogOpen, setIsQRCodeDialogOpen] = useState(false);

  const dropdownTriggerReference = useRef<HTMLButtonElement | null>(null);
  const focusReference = useRef<HTMLButtonElement | null>(null);

  const { address } = useAccount();
  const displayAddress = useMemo(
    () => `${address?.slice(0, 8)}...${address?.slice(-8)}`,
    [address]
  );

  function handleDropdownItemSelect() {
    focusReference.current = dropdownTriggerReference.current;
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={dropdownTriggerReference}
          color='default'
          onClick={() => setIsDropdownOpen((previousState) => !previousState)}
        >
          {displayAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        hidden={isQRCodeDialogOpen}
        onCloseAutoFocus={(event) => {
          if (focusReference.current) {
            focusReference.current.focus();
            focusReference.current = null;

            event.preventDefault();
          }
        }}
      >
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
          <QRCodeDialog
            isDialogOpen={isQRCodeDialogOpen}
            address={address}
            onDropdownSelect={handleDropdownItemSelect}
            onDialogOpenChange={(open) => setIsQRCodeDialogOpen(open)}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
