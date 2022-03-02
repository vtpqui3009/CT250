import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51KRqpcL6Cna0WfUDsuGJ8ATwrGpVZszhBy6A56z0VNDHrhxshIAVUG02KeaHIBt7nBbNdAr7BmIzxRNffxU9WXlV00MMxIKhJi"
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    // <Elements stripe={stripePromise}>
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
    // </Elements>
  );
};
export default CheckoutForm;
