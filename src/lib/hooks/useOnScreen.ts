import { MutableRefObject, useEffect, useState } from "react";

function useOnScreen<T extends Element | null>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
) {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useEffect(() => {
    let current: T;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
      current = ref.current;
    }
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);
  return isIntersecting;
}

export default useOnScreen;
