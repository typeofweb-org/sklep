import React from 'react';

export const Hero = () => {
  return (
    <section className="w-screen bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right hero">
      <div className="container mx-auto">
        <div className="flex flex-col w-full lg:w-1/2 -mt-6 justify-center items-start px-6 tracking-wide">
          <h1 className="text-gray-100 text-4xl lg:my-4 max-w-xs lg:max-w-full">
            Przykładowy obrazek HERO
          </h1>
          <a
            className="text-xl inline-block no-underline text-gray-100 border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
            href="#"
          >
            produkty
          </a>
        </div>
      </div>
    </section>
  );
};
