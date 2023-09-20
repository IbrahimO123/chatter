import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

type ScrollToTopProps = {
  children: React.ReactNode;
};

const ScrollToTop = (props: ScrollToTopProps) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
};

export default ScrollToTop;
