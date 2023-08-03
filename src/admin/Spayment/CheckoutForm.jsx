import React, { useState } from 'react';
import {
  useStripe, useElements, CardElement,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import "./StripePayment.css";
import { stripePaymentMethodHandler } from './script';
import country from "../Signup/countries.json";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  // hidePostalCode: true
};

export default function CheckoutForm(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [countryData, setCountryData] = useState({
    name: "",
    currencyCode: "",
    countryCode: "",
  });

  // const { clearLsData } = useSelector(
  //   (state) => state.accountCreationApiReducer
  // );

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const paymentMethodObj = {
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name,
        email
      },
    };
    const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);

    stripePaymentMethodHandler({
      result: paymentMethodResult,
      amount: props.amount,
      cartDetails: props.cartDetails,
      countryData: countryData
    }, handleResponse);
  };

  // callback method to handle the response
  const handleResponse = async response => {
    // console.log(response,'handle response');
    setLoading(false);
    if (response.error) {
      setErrorMsg(response.error.message);
      return;
    }
    if (!response.status) return alert("Payment unsuccessful!");
    const data = await response;
    // console.log(elements.getElement(CardElement));
    const confirm = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardNumberElement) }
    });
    const { paymentIntent } = confirm;
    if (paymentIntent.status !== 'succeeded') return alert("Payment unsuccessful!");
    props.setPaymentDetails(data);
    props.setPaymentCompleted(paymentIntent.status === 'succeeded' ? true : false);
  };

  const onSelectCountry = (name, currCode, contCode) => {
    setCountryData({
      name: name,
      currencyCode: currCode,
      countryCode: contCode,
    });
  };

  return (
    <React.Fragment>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Pay with card</span>
      </h4>
      <form onSubmit={handleSubmit}>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input
              id="cc-name"
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-email">Email</label>
            <input
              id="cc-email"
              type="text"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card</label>
            <CardElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>  */}

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-name">Search and select country</label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: "0" }}
              value={countryData.name}
              // placeholder="Search and select country"
              onChange={(e) =>
                setCountryData({ ...countryData, name: e.target.value })
              }
            />
            <div className="countryDropdown" style={{ width: '41%' }}>
              {country.countries
                .filter((item) => {
                  const searchTerm = countryData.name.toLowerCase();
                  const fullName = item?.countryName.toLowerCase();
                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 5)
                .map((item) => (
                  <div
                    onClick={() =>
                      onSelectCountry(
                        item.countryName,
                        item.currencyCode,
                        item.countryCode
                      )
                    }
                    className="dropdownRow"
                    key={item.countryCode}
                  >
                    {item.countryName}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <hr className="mb-4" />
        <button className="btn card-btn w-100" type="submit" disabled={loading}>
          {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY ₹${props.amount}`}
        </button>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </React.Fragment>
  );
}