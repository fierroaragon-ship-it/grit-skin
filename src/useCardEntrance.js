import { useEffect, useRef } from 'react';
import { observeCardEntrances } from './cardMotion.js';

export default function useCardEntrance(contentKey = '') {
  const root = useRef(null);
  const seen = useRef(new WeakSet());
  useEffect(() => observeCardEntrances(root.current, seen.current), [contentKey]);
  return root;
}
