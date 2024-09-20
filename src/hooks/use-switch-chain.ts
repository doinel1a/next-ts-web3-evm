import { useCallback, useMemo } from 'react';

import { toast } from 'sonner';
import { useAccount, useSwitchChain as useWagmiSwitchChain } from 'wagmi';

export default function useSwitchChain(onSuccessCallback?: () => void) {
  const { chainId: activeChainId } = useAccount();
  const { chains, variables, isError, isSuccess, reset, switchChainAsync } = useWagmiSwitchChain();
  const mainnetChains = useMemo(() => chains.filter((chain) => !!!chain.testnet), [chains]);
  const testnetChains = useMemo(() => chains.filter((chain) => !!chain.testnet), [chains]);

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains]
  );

  const isConnectedToSupportedChain = useMemo(
    () => (activeChainId ? !!chains.some((chain) => chain.id === activeChainId) : true),
    [activeChainId, chains]
  );

  const onSwitchChain = useCallback(
    async (chainId: number) => {
      if (activeChainId === chainId) {
        return;
      }

      try {
        await switchChainAsync({ chainId });

        const activeChain = chains.find((chain) => chain.id === chainId);
        toast.success('Success', {
          description: activeChain
            ? `Chain switched to ${activeChain.name}.`
            : 'Chain switched to the selected one.'
        });

        onSuccessCallback?.();
      } catch (error: unknown) {
        if (
          error !== null &&
          error !== undefined &&
          typeof error === 'object' &&
          'name' in error &&
          typeof error.name === 'string'
        ) {
          let errorMessage = '';

          switch (error.name) {
            case 'UserRejectedRequestError': {
              errorMessage = 'The switch chain request was rejected.';
              break;
            }
            case 'SwitchChainError': {
              errorMessage = 'A switch chain request is already pending.';
              break;
            }
            default: {
              errorMessage = 'Something horribly wrong happened.';
              break;
            }
          }

          toast.error('Error', {
            description: errorMessage
          });
        }

        console.error('Error switching chain', error);
      }
    },
    [activeChainId, chains, onSuccessCallback, switchChainAsync]
  );

  return {
    activeChain,
    activeChainId,
    mainnetChains,
    testnetChains,
    variables,
    isError,
    isSuccess,
    isConnectedToSupportedChain,
    reset,
    onSwitchChain
  };
}
