import React from 'react';

const Menu = () => {
  return (
    <section className="menu">
      <h1 className="text-center">
        Menu for Today {(new Date()).toDateString()}
      </h1>
      <div className="card menu-card table-scroll">
        <table className="font-weight-bold">
          <tbody>
            <tr>
              <td>Vegetable Soup</td>
              <td>&#x20a6; 2500</td>
              <td title="Click to delete meal from menu">&times;</td>
            </tr>
            <tr>
              <td>Nigerian Jollof</td>
              <td>&#x20a6; 1500</td>
              <td title="Click to delete meal from menu">&times;</td>
            </tr>
            <tr>
              <td>Spaghetti</td>
              <td>&#x20a6; 2000</td>
              <td title="Click to delete meal from menu">&times;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Menu;
