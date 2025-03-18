'use client';

import React, { useCallback, useEffect, useState } from 'react';

import type { PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogPortal } from '@/components/ui/dialog';
import useSwitchChain from '@/hooks/use-switch-chain';

import SwitchChainDialogContent from '../switch-chain/dialog-content';

type TWithSupportedChains = PropsWithChildren;

export default function WithSupportedChains({ children }: TWithSupportedChains) {
  const [isSwitchChainDialogOpen, setIsSwitchChainDialogOpen] = useState(false);

  const {
    activeChainId,
    mainnetChains,
    testnetChains,
    variables,
    isError,
    isSuccess,
    isConnectedToSupportedChain,
    reset,
    onSwitchChain
  } = useSwitchChain();

  const onDialogOpenChange = useCallback(
    (open: boolean) => {
      if (!isConnectedToSupportedChain) {
        return;
      }

      setIsSwitchChainDialogOpen(open);
    },
    [isConnectedToSupportedChain, setIsSwitchChainDialogOpen]
  );

  const onSwitchSuccessCallback = useCallback(() => {
    reset();
    onDialogOpenChange(false);
    setIsSwitchChainDialogOpen(false);
  }, [reset, onDialogOpenChange, setIsSwitchChainDialogOpen]);

  useEffect(() => {
    if (isConnectedToSupportedChain) {
      onSwitchSuccessCallback();
    } else {
      setIsSwitchChainDialogOpen(true);
    }
  }, [isConnectedToSupportedChain, onSwitchSuccessCallback]);

  return (
    <>
      <Dialog open={isSwitchChainDialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogPortal>
          <DialogContent hideCloseButton>
            <SwitchChainDialogContent
              activeChainId={activeChainId}
              pendingChainId={variables?.chainId ?? 0}
              isSwitchSuccess={isSuccess}
              isSwitchError={isError}
              mainnetChains={mainnetChains}
              testnetChains={testnetChains}
              description='You are connected to an unsupported chain. Please switch to a chain from the list below.'
              onSwitchChain={onSwitchChain}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {children}
    </>
  );
}
