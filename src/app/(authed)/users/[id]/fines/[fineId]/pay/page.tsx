import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { getPageData } from "./data";
import FineCheckoutWrapper from "@/components/FinePaymentPage/FineCheckoutWrapper";

type Props = {
  params: Promise<{ fineId: string; id: string }>;
};

const FinePaymentPage = async ({ params }: Props) => {
  const { fineId, id } = await params;

  const { data, error } = await getPageData(fineId);

  if (!data || error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Cannot pay for the fine!</AlertTitle>
        <AlertDescription>{error?.response?.data.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <FineCheckoutWrapper clientSecret={data} userId={id} />
    </div>
  );
};

export default FinePaymentPage;
