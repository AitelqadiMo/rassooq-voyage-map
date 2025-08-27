import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "default" | "lg";
}

export const QuantitySelector = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  size = "default" 
}: QuantitySelectorProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
      setInputValue((value - 1).toString());
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
      setInputValue((value + 1).toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseInt(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < min) {
      setInputValue(min.toString());
      onChange(min);
    } else if (numValue > max) {
      setInputValue(max.toString());
      onChange(max);
    }
  };

  const buttonSize = size === "sm" ? "icon" : size === "lg" ? "default" : "sm";
  const inputSize = size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10";

  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleDecrease}
        disabled={value <= min}
        className={`rounded-r-none border-0 ${
          size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"
        }`}
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </Button>
      
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className={`border-0 border-l border-r text-center rounded-none focus-visible:ring-0 ${inputSize} ${
          size === "sm" ? "w-12 text-sm" : size === "lg" ? "w-16" : "w-14"
        }`}
        min={min}
        max={max}
      />
      
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleIncrease}
        disabled={value >= max}
        className={`rounded-l-none border-0 ${
          size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"
        }`}
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </Button>
    </div>
  );
};