// Progressive enhancement: cards are visible before, during and after setup failures.
export function observeCardEntrances(root, seen = new WeakSet(), environment = window) {
  if (!root || typeof environment.matchMedia !== 'function' || typeof environment.IntersectionObserver !== 'function') return () => {};
  const preference = environment.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let observer;
  const stop = () => {
    observer?.disconnect();
    for (const animation of active) animation.cancel();
    active.clear();
  };
  const refresh = () => {
    stop();
    if (preference.matches) return;
    observer = new environment.IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || preference.matches || seen.has(target)) continue;
        observer.unobserve(target);
        seen.add(target);
        if (typeof target.animate !== 'function' || target.matches(':focus-within')) continue;
        const animation = target.animate([
          { opacity: 0.88, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 480, easing: 'cubic-bezier(.2,.7,.3,1)' });
        active.add(animation);
        const finish = () => active.delete(animation);
        animation.finished.then(finish, finish);
      }
    }, { threshold: 0.12 });
    root.querySelectorAll('.category-visual-card, .product-card').forEach(card => {
      if (!seen.has(card)) observer.observe(card);
    });
  };
  refresh();
  preference.addEventListener?.('change', refresh);
  return () => { stop(); preference.removeEventListener?.('change', refresh); };
}
