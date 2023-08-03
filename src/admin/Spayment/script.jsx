
import {
  OwnerandCareSiteDetails
} from "../../redux-toolkit/reducer/accountCreationApiReducer";

export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, result, cartDetails, countryData } = data;
  console.log(countryData,'stripe card result');
  let staticData = {
    careStieName: "yogendra ltd",
    email: result.paymentMethod.billing_details.email,
    country: "uk",
    address: "2126 malviya nagar",
    phone: "9898898989",
    paymentMethod: result.paymentMethod.id,
    productId: "prod_N44TswQoPtNTjx", //cartDetails.productId,
    currency: "INR",
    unit_amount: '3000',
    interval: 'month',
    trialDays: 6,
    couponType: "amount_off",
    amount_off: "100",
    redemCount: "6"
  }
  let dynamicData = {
    careStieName: OwnerandCareSiteDetails.careSiteName,
    email: result.paymentMethod.billing_details.email,
    country: countryData.name,
    address: OwnerandCareSiteDetails.address,
    phone: OwnerandCareSiteDetails.mobileNo,
    paymentMethod: result.paymentMethod.id,
    productId: "prod_N44TswQoPtNTjx",
    currency: countryData.currencyCode,
    unit_amount: amount,
    interval: cartDetails.interval,
    trialDays: cartDetails.trialDays,
    couponType: "amount_off",
    amount_off: cartDetails.amount_off,
    redemCount: "6"
  }
  if (result.error) {
    // show error in payment form
    cb(result);
  } else {
    const paymentResponse = await stripePayment(dynamicData);
    localStorage.setItem("stripePayData", JSON.stringify(dynamicData));
    // console.log(paymentResponse,'paymentResponse')
    cb(paymentResponse);
  }
}

// place backend API call for payment
const stripePayment = async data => {
  console.log(data,'stripe payment');
  const res = await fetch(`${process.env.REACT_APP_BASEURL}/createStripeSubscription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  // console.log(res,'response api');
  return await res.json();
}