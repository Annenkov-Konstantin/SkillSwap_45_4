// features/ScrollToTop/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ScrollToTop = () => {
  // const location = useLocation();
  const params = useParams();

  useEffect(() => {
    document.body.scrollTop = 0;

  }, [params]);

  return null;
};

export default ScrollToTop;
