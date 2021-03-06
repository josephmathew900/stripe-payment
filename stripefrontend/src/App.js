import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product, setProduct] = useState({
    name: 'React From FB',
    price: 10,
    productBy: 'Facebook',
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(`http://localhost:8282/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        const { status } = res;
        console.log(status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large pink">
            Buy React in just {product.price} $
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
