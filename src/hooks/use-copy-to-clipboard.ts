import { useCallback, useEffect, useState } from 'react';

export default function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [isClipboardApiSupported, setIsClipboardApiSupported] = useState(true);

  useEffect(() => {
    const isClipboardApiSupported = !!navigator.clipboard?.writeText;
    setIsClipboardApiSupported(isClipboardApiSupported);
  }, []);

  const copyToClipboard = useCallback(
    async (content: string | null | undefined) => {
      // eslint-disable-next-line unicorn/prefer-global-this
      if (typeof window === 'undefined') {
        return;
      }

      if (!isClipboardApiSupported) {
        return;
      }

      if (!content) {
        throw new Error('ERROR CLIPBOARD');
      }

      navigator.clipboard
        .writeText(content)
        .then(() => {
          setIsCopied(true);

          setTimeout(() => {
            setIsCopied(false);
          }, timeout);

          return null;
        })
        .catch((error) => console.error('ERROR CLIPBOARD', error));
    },
    [timeout, isClipboardApiSupported]
  );

  return { isCopied, isClipboardApiSupported, copyToClipboard };
}
