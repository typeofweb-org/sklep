import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage: NextPage = function HomePage() {
  // client-side rendering
  const router = useRouter();
  useEffect(() => {
    void router.replace('/produkty');
  }, [router]);
  return null;
};
HomePage.getInitialProps = (appContext) => {
  // server-side rendering
  if (typeof window === 'undefined' && appContext.res) {
    appContext.res.writeHead(302, { Location: '/produkty' });
    appContext.res.end();
  }
  return {};
};

export default HomePage;
