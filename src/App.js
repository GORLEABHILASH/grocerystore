import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [groceries, setGroceries] = useState([
    { name: 'Apples', quantity: 0 },
    { name: 'Oranges', quantity: 0 },
    { name: 'Grapes', quantity: 0 },
    { name: 'Bananas', quantity: 0 },
  ]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch groceries from the backend when the component mounts
    axios
      .get('http://localhost:3001/api/cart')
      .then((response) => setCart(response.data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += item.quantity;
    } else {
      // If the item doesn't exist, add it to the cart with the specified quantity
      setCart([...cart, { name: item.name, quantity: item.quantity }]);
    }
  };

  const increaseQuantity = (item) => {
    // Increase the quantity of the item in the grocery list
    setGroceries((prevGroceries) =>
      prevGroceries.map((groceryItem) =>
        groceryItem.name === item.name
          ? { ...groceryItem, quantity: groceryItem.quantity + 1 }
          : groceryItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    // Decrease the quantity of the item in the grocery list (minimum quantity is 0)
    setGroceries((prevGroceries) =>
      prevGroceries.map((groceryItem) =>
        groceryItem.name === item.name
          ? {
              ...groceryItem,
              quantity: Math.max(groceryItem.quantity - 1, 0),
            }
          : groceryItem
      )
    );
  };

  return (
    <div>
    {/* Header with Name, Logo, and GitHub icon */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#2ecc71', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/grocery-logo.png" alt="Grocery Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <h1>Grocery App</h1>
      </div>
      <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
        <img src="/github.png" alt="GitHub" style={{ width: '30px', height: '30px' }} />
      </a>
    </div>
     

      <div style={{ display: 'flex' }}>
        {/* Left side: Grocery List */}
        <div style={{ flex: 1, margin: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h2 style={{ color: '#333' }}>Grocery List</h2>
          <ul>
            {groceries.map((item, index) => (
              <li key={index} style={{ listStyle: 'none', marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
                {item.name}
                <button onClick={() => increaseQuantity(item)}>+</button>
                <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Shopping Cart */}
        <div style={{ flex: 1, margin: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h2 style={{ color: '#333' }}>Shopping Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} style={{ listStyle: 'none', marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
