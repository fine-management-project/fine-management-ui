"use client";

import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

type Props = {
  userId: string;
};

const FineCheckoutForm = ({ userId }: Props): React.JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/users/${userId}/fines`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        disabled={isLoading || !stripe || !elements}
        className="w-full text-white p-2 rounded"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
};

export default FineCheckoutForm;
