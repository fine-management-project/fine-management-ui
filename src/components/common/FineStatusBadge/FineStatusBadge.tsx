"use client";

import { Badge } from "@/components/ui/badge";
import { FineStatus } from "@/lib/models/fine";
import { FineStatusColor } from "@/lib/utils/colors";

type Props = {
  value: FineStatus;
};

const FineStatusBadge = ({ value }: Props): React.JSX.Element => {
  return (
    <Badge style={{ backgroundColor: FineStatusColor[value], color: "black" }}>
      {value.toUpperCase()}
    </Badge>
  );
};

export default FineStatusBadge;
