'use client';

import { useCallback } from 'react';

import type { Address } from 'viem';

import { toast } from 'sonner';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';

import IconItem from '../commons/icon-item';

type TCopyAddress = {
  address: Address | undefined;
};

export default function CopyAddress({ address }: Readonly<TCopyAddress>) {
  const { isClipboardApiSupported, copyToClipboard } = useCopyToClipboard();

  const onCopyAddressClick = useCallback(() => {
    toast.promise(copyToClipboard(address), {
      loading: 'Copying address to clipboard',
      success: 'Address copied to clipboard',
      error: 'Error copying address to clipboard'
    });
  }, [address, copyToClipboard]);

  if (!isClipboardApiSupported) {
    return null;
  }

  return (
    <DropdownMenuItem onClick={onCopyAddressClick}>
      <IconItem iconName='IconClipboardCopy' text='Copy Address' />
    </DropdownMenuItem>
  );
}
