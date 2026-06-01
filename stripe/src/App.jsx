import React, { useMemo } from "react";
import {loadStripe} from '@stripe/stripe-js';

import {
  CheckoutElementsProvider
} from '@stripe/react-stripe-js/checkout';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CheckoutForm from './CheckoutForm';
import Complete from './Complete';

import "./App.css";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Tcfy6JwSInGPmPFsfi9MzBZz0aqOND3E3vN6J4pig9jYYpcSW6Nfz1U4leU9j1YurEdzgRXTNyFVl3Hs7xDskfh00PccORn7e");

const App = () => {
  const clientSecret = useMemo(() => {
    return fetch('/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  return (
    <div className="App">
      <Router>

        <CheckoutElementsProvider
          stripe={stripePromise}
          options={{
            clientSecret,
            elementsOptions: {appearance},
          }}
        >
          <Routes>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/complete" element={<Complete />} />
          </Routes>
        </CheckoutElementsProvider>
      </Router>
    </div>
  )
}

export default App;