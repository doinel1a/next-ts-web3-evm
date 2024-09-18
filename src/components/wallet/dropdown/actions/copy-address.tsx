'use client';

import React from 'react';

import type { Address } from 'viem';

import { Check, ClipboardCopy } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import useCopyToClipboard from '@/lib/custom-hooks/use-copy-to-clipboard';

import IconItem from '../commons/icon-item';

type TCopyAddress = {
  address: Address | undefined;
};

export default function CopyAddress({ address }: TCopyAddress) {
  const { isClipboardApiSupported, isCopied, copyToClipboard } = useCopyToClipboard();

  if (!isClipboardApiSupported) {
    return null;
  }

  return (
    <DropdownMenuItem
      onClick={async () => {
        if (isClipboardApiSupported && address) {
          await copyToClipboard(address);
        }
      }}
    >
      <IconItem icon={isCopied ? Check : ClipboardCopy} text='Copy Address' />
    </DropdownMenuItem>
  );
}
