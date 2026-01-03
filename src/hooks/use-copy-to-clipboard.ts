import { useCallback, useState } from 'react';

export default function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [isClipboardApiSupported] = useState(getClipboardApiSupported);

  const copyToClipboard = useCallback(
    async (content: string | null | undefined) => {
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
        .catch((error) => {
          console.error('ERROR CLIPBOARD', error);
        });
    },
    [timeout, isClipboardApiSupported]
  );

  return { isCopied, isClipboardApiSupported, copyToClipboard };
}

function getClipboardApiSupported() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return 'clipboard' in navigator && typeof navigator.clipboard.writeText === 'function';
}
