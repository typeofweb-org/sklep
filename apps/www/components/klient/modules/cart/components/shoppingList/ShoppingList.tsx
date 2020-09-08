import React from 'react';

export const ShoppingList = React.memo(() => {
  return (
    <div className="w-full sm:w-1/2 md:w-2/3 mb-4">
      <h3 className="text-2xl">Koszyk zakupowy</h3>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2">Title</th>
            <th className="w-1/4 px-4 py-2">Author</th>
            <th className="w-1/4 px-4 py-2">Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Intro to CSS</td>
            <td className="px-4 py-2">Adam</td>
            <td className="px-4 py-2">858</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2">
              A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on
              Design
            </td>
            <td className="px-4 py-2">Adam</td>
            <td className="px-4 py-2">112</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Intro to JavaScript</td>
            <td className="px-4 py-2">Chris</td>
            <td className="px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
ShoppingList.displayName = 'ShoppingList';
