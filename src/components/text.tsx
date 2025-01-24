import * as React from "react";
import * as RPNInput from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
    React.ComponentProps<"input">,
    "onChange" | "value" | "ref"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(({ className, onChange, ...props }, ref) => {
        return (
            <RPNInput.default
                ref={ref}
                defaultCountry="UZ"
                className={cn("flex", className)}
                countrySelectComponent={CountrySelect}
                inputComponent={InputComponent}
                limitMaxLength={true}
                /**
                 * Handles the onChange event.
                 *
                 * react-phone-number-input might trigger the onChange event as undefined
                 * when a valid phone number is not entered. To prevent this,
                 * the value is coerced to an empty string.
                 *
                 * @param {E164Number | undefined} value - The entered value
                 */
                onChange={(value) =>
                    onChange?.(value || ("" as RPNInput.Value))
                }
                {...props}
            />
        );
    });
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
    <Input
        className={cn("rounded-e-lg rounded-s-none", className)}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled }: CountrySelectProps) => {
    return (
        <Button
            type="button"
            variant="outline"
            className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
            disabled={disabled}
        >
            +998
        </Button>
    );
};

export { PhoneInput };
