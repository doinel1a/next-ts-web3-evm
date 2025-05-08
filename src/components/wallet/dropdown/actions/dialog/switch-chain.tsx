'use client';

import React, { useCallback } from 'react';

import { RefreshCcw } from 'lucide-react';

import SwitchChainDialogContent from '@/components/switch-chain/dialog-content';
import useSwitchChain from '@/hooks/use-switch-chain';

import ForwardedDialog from '.';
import IconDropdownMenuItem from '../../commons/icon-item';

type TSwitchChainDialog = {
  isDialogOpen?: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDropdownSelect: () => void;
  onDialogOpenChange: (open: boolean) => void;
};

export default function SwitchChainDialog({
  isDialogOpen,
  setIsDropdownOpen,
  onDropdownSelect,
  onDialogOpenChange
}: Readonly<TSwitchChainDialog>) {
  const onSwitchSuccessCallback = useCallback(() => {
    onDialogOpenChange(false);
    setIsDropdownOpen(false);
  }, [onDialogOpenChange, setIsDropdownOpen]);

  const {
    activeChainId,
    mainnetChains,
    testnetChains,
    variables,
    isError,
    isSuccess,
    reset,
    onSwitchChain
  } = useSwitchChain(onSwitchSuccessCallback);

  return (
    <ForwardedDialog
      isDialogOpen={isDialogOpen}
      triggerChildren={<IconDropdownMenuItem icon={RefreshCcw} text='Switch Chain' />}
      onDropdownSelect={onDropdownSelect}
      onDialogOpenChange={(open) => {
        onDialogOpenChange(open);
        reset();
      }}
    >
      <SwitchChainDialogContent
        activeChainId={activeChainId}
        pendingChainId={variables?.chainId ?? 0}
        isSwitchSuccess={isSuccess}
        isSwitchError={isError}
        mainnetChains={mainnetChains}
        testnetChains={testnetChains}
        onSwitchChain={onSwitchChain}
      />
    </ForwardedDialog>
  );
}
