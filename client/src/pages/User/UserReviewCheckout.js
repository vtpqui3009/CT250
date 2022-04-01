import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
const UserReviewCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_API}/payment/create`,
        {
          amount: 10,
        }
      );
      console.log(data);
      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientSecret is >>>>", clientSecret);
  }, [clientSecret]);

  const confirmPayment = async (e) => {
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      //   .then((result) => {
      //     axios.post("/orders/add", {
      //       basket: basket,
      //       price: getBasketTotal(basket),
      //       email: user?.email,
      //       address: address,
      //     });
      // navigate("/");
      //   })
      .catch((err) => console.warn(err));
  };
  return (
    <div>
      {/* <PaymentContainer> */}
      <h5>Payment Method</h5>

      <div>
        <p>Card Details</p>

        {/* Card Element */}

        <CardElement />
      </div>
      {/* </PaymentContainer> */}
      <button onClick={confirmPayment}>Place Order</button>
    </div>
  );
};
export default UserReviewCheckout;
