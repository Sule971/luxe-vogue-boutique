
import { PasswordStrength } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
}

const PasswordStrengthMeter = ({ strength }: PasswordStrengthMeterProps) => {
  const getStrengthValue = () => {
    switch (strength) {
      case 'weak':
        return 33;
      case 'medium':
        return 66;
      case 'strong':
        return 100;
      default:
        return 0;
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Password Strength</span>
        <span className="text-sm font-medium capitalize">{strength}</span>
      </div>
      <Progress className={`h-2 ${getStrengthColor()}`} value={getStrengthValue()} />
    </div>
  );
};

export default PasswordStrengthMeter;
