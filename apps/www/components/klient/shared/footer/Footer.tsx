import React from 'react';

export const Footer = React.memo(() => (
  <footer className="w-full bg-white py-8 border-t border-gray-400">
    <div className="container mx-auto flex px-3 py-8 ">
      <div className="w-full mx-auto flex flex-wrap">
        <div className="flex w-full lg:w-1/2 ">
          <div className="px-3 md:px-0">
            <h3 className="font-bold text-gray-900">About</h3>
            <p className="py-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis
              tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
            </p>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
          <div className="px-3 md:px-0">
            <h3 className="font-bold text-gray-900">Social</h3>
            <ul className="list-reset items-center pt-3">
              <li>
                <a
                  className="inline-block no-underline hover:text-black hover:underline py-1"
                  href="#"
                >
                  Add social links
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
));
