import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@heroui/button';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import DynamicFallback from './commons/dynamic-fallback';

const CopyAddress = dynamic(() => import('./actions/copy-address'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const QRCodeDialog = dynamic(() => import('./actions/dialog/qrcode'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const SwitchChainDialog = dynamic(() => import('./actions/dialog/switch-chain'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const Disconnect = dynamic(() => import('./actions/disconnect'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const Faucet = dynamic(() => import('./actions/faucet'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const Balance = dynamic(() => import('./details/balance'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const ENSName = dynamic(() => import('./details/ens-name'), {
  loading: () => <DynamicFallback />,
  ssr: false
});
const Chain = dynamic(() => import('./details/chain'), {
  loading: () => <DynamicFallback />,
  ssr: false
});

export default function WalletDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRCodeDialogOpen, setIsQRCodeDialogOpen] = useState(false);
  const [isSwitchChainDialogOpen, setIsSwitchChainDialogOpen] = useState(false);

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
        hidden={isQRCodeDialogOpen || isSwitchChainDialogOpen}
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
          <Chain />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Faucet />
          <CopyAddress address={address} />
          <QRCodeDialog
            isDialogOpen={isQRCodeDialogOpen}
            address={address}
            onDropdownSelect={handleDropdownItemSelect}
            onDialogOpenChange={(open) => setIsQRCodeDialogOpen(open)}
          />
          <SwitchChainDialog
            isDialogOpen={isSwitchChainDialogOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            onDropdownSelect={handleDropdownItemSelect}
            onDialogOpenChange={(open) => setIsSwitchChainDialogOpen(open)}
          />
          <DropdownMenuSeparator />
          <Disconnect />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
