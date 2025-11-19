import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const PasswordInput = (
  props: React.ComponentProps<"input">
): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} {...props} />

      <div className="absolute right-2 top-1.5 cursor-pointer">
        {showPassword ? (
          <EyeOffIcon onClick={() => setShowPassword(false)} />
        ) : (
          <EyeIcon onClick={() => setShowPassword(true)} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
