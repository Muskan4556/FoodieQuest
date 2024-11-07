declare global {
  interface Window {
    Razorpay: {
      new (options: Razorpay.Options): Razorpay.Payment;
      open(): void;
    };
  }

  namespace Razorpay {
    interface Options {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      image?: string;
      order_id: string;
      handler: (response: Razorpay.PaymentResponse) => void; // Type the handler callback
      prefill: {
        name: string;
        email: string;
      };
      notes: {
        address: string;
      };
      theme: {
        color: string;
      };
    }

    interface Payment {
      open(): void;
      close(): void;
    }

    interface PaymentResponse {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }
  }
}

export {};
