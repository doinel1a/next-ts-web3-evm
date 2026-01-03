'use client';

import { useDisconnect } from 'wagmi';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import IconItem from '../commons/icon-item';

export default function Disconnect() {
  const { disconnect } = useDisconnect();

  return (
    <DropdownMenuItem
      className='text-destructive hover:bg-destructive! hover:text-destructive-foreground focus:bg-destructive! focus:text-destructive-foreground'
      onClick={() => {
        disconnect();
      }}
    >
      <IconItem iconName='IconLogout' text='Disconnect' />
    </DropdownMenuItem>
  );
}
