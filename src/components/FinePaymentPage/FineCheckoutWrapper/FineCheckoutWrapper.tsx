"use client";

import FineCheckoutForm from "../FineCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  clientSecret: string;
  userId: string;
};

const FineCheckoutWrapper = (props: Props): React.JSX.Element | null => {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: props.clientSecret }}
    >
      <FineCheckoutForm userId={props.userId} />
    </Elements>
  );
};

export default FineCheckoutWrapper;
