import { useRef } from 'react';

export function usePrevious<T>(value: T): T | null {
  const previousRef = useRef<T | null>(null);
  const previousValue = previousRef.current;
  previousRef.current = value;
  return previousValue;
}

export function useSingleton<T>(initialize: () => T): T {
  const initializedRef = useRef(false);
  const singletonRef = useRef<T>();

  if (!initializedRef.current) {
    initializedRef.current = true;
    singletonRef.current = initialize();
  }

  return singletonRef.current!;
}
