import React from 'react';

import { Layout } from '../../components/klient/shared/layout/Layout';

function ONasPage() {
  return (
    <Layout title="Sklep - o nas">
      <section className="bg-white worksans py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <header className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <h2 className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                O NAS
              </h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis
              tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia
            </div>
          </header>
        </div>
      </section>
    </Layout>
  );
}

export default ONasPage;
