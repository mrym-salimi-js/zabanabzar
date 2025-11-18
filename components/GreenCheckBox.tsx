import { ReactElement } from "react";
import { Tick } from "./Icons";

type GreenCheckBoxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function GreenCheckBox({
  checked = false,
  onChange,
}: GreenCheckBoxProps): ReactElement {
  return (
    <div className="flex justify-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="
            peer h-5 w-5 cursor-pointer transition-all appearance-none
            rounded border !border-gray-200 dark:!border-gray-600
            checked:bg-[var(--secondary)] checked:border-[var(--secondary)]
          "
        />
        <span
          className="
          absolute text-white opacity-0 peer-checked:opacity-100
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
        >
          <Tick classes="size-3.5 text-black" />
        </span>
      </label>
    </div>
  );
}
