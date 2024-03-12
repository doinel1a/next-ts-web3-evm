'use client';

import React from 'react';

import type { Address } from 'viem';

import { Check, ClipboardCopy } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import useCopyToClipboard from '@/lib/custom-hooks/use-copy-to-clipboard';

import IconItem from '../icon-item';

type TCopyAddress = {
  address: Address | undefined;
};

export default function CopyAddress({ address }: TCopyAddress) {
  const { isClipboardApiSupported, isCopied, copyToClipboard } = useCopyToClipboard();

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
