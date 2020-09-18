import React from 'react';

// todo: to fill with correct images
export const CartItemImage = React.memo(() => {
  return (
    <img
      width="350"
      height="434"
      src="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-450x558.jpg"
      alt=""
      loading="lazy"
      srcSet="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-450x558.jpg 450w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-600x744.jpg 600w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-242x300.jpg 242w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-825x1024.jpg 825w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-680x844.jpg 680w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-700x868.jpg 700w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-220x273.jpg 220w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-140x174.jpg 140w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern-940x1166.jpg 940w,
          https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-lighthouse-lantern.jpg 1280w"
      sizes="(max-width: 350px) 100vw, 350px"
    />
  );
});
CartItemImage.displayName = 'CartItemImage';
