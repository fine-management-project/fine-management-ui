import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fine } from "@/lib/models/fine";
import FineForm from "./FineForm";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  fine: Fine | null;
  userId: string;
  setSelectedFine: Dispatch<SetStateAction<Fine | null>>;
};

const FineInfoCard = ({
  fine,
  userId,
  setSelectedFine,
}: Props): React.JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Fine Info{" "}
          {fine && (
            <Button variant="link" onClick={() => setSelectedFine(null)}>
              Close
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FineForm
          fine={fine}
          userId={userId}
          setSelectedFine={setSelectedFine}
        />
      </CardContent>
    </Card>
  );
};

export default FineInfoCard;
