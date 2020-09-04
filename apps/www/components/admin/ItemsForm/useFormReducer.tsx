// import { useReducer } from 'react';

// export type Item = {
//   name: string;
//   description: string;
//   price: number;
//   discountPrice?: number;
//   isDiscount: boolean;
//   isPublic: boolean;
// };

// type Action =
//   | {
//       type: 'setName' | 'setDescription';
//       value: string;
//     }
//   | {
//       type: 'setPrice' | 'setDiscountPrice';
//       value: number;
//     }
//   | {
//       type: 'toggleIsPublic' | 'toggleIsDiscount';
//     };

// function formReducer(state: Item, action: Action): Item {
//   switch (action.type) {
//     case 'setName': {
//       return { ...state, name: action.value };
//     }
//     case 'setDescription': {
//       return { ...state, description: action.value };
//     }
//     case 'setPrice': {
//       return { ...state, price: action.value };
//     }
//     case 'setDiscountPrice': {
//       return { ...state, discountPrice: action.value };
//     }
//     case 'toggleIsDiscount': {
//       return { ...state, isDiscount: !state.isDiscount };
//     }
//     case 'toggleIsPublic': {
//       return { ...state, isPublic: !state.isPublic };
//     }
//   }
// }

// function useFormReducer() {
//   return useReducer(formReducer, {
//     name: '',
//     description: '',
//     price: 0,
//     isDiscount: false,
//     isPublic: false,
//   });
// }

// export { useFormReducer };
