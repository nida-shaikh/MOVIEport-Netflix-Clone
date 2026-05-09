import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi URL (page) change ho, page upar scroll kare
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ye component screen pe kuch nahi dikhayega
}

export default ScrollToTop;