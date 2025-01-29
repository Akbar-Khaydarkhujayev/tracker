import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    AsYouType,
    type CarrierCode,
    type CountryCallingCode,
    type E164Number,
    type NationalNumber,
    type CountryCode,
    type NumberType,
} from "libphonenumber-js";
import * as React from "react";

export type PhoneData = {
    phoneNumber?: E164Number;
    countryCode?: CountryCode;
    countryCallingCode?: CountryCallingCode;
    carrierCode?: CarrierCode;
    nationalNumber?: NationalNumber;
    internationalNumber?: string;
    possibleCountries?: string;
    isValid?: boolean;
    isPossible?: boolean;
    uri?: string;
    type?: NumberType;
};

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {
    value?: string;
    defaultCountry?: CountryCode;
    setValue?: (value: string) => void;
}

export function PhoneInput({
    value,
    className,
    id,
    required = true,
    setValue,
    ...rest
}: PhoneInputProps) {
    const asYouType = new AsYouType();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const initializeDefaultValue = () => {
        if (value) {
            return value;
        }

        return `+998`;
    };

    const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
        asYouType.reset();

        let value = event.currentTarget.value;
        if (!value.startsWith("+")) {
            value = `+${value}`;
        }

        const formattedValue = asYouType.input(value);
        event.currentTarget.value = formattedValue;
    };

    const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        asYouType.reset();

        const clipboardData = event.clipboardData;

        if (clipboardData) {
            let pastedData = clipboardData.getData("text/plain");
            if (pastedData.startsWith("+998")) {
                pastedData = pastedData.slice(4);
            }
            pastedData = pastedData.replace(/\s+/g, "");
            const formattedValue = asYouType.input(`+998${pastedData}`);
            event.currentTarget.value = formattedValue;
            if (setValue) setValue(formattedValue);
        }
    };

    return (
        <div className={cn("flex gap-2", className)}>
            <Input
                ref={inputRef}
                type="text"
                pattern="^(\+)?[0-9\s]*$"
                name="phone"
                maxLength={17}
                id={id}
                placeholder="Phone"
                defaultValue={initializeDefaultValue()}
                onInput={handleOnInput}
                onPaste={handleOnPaste}
                required={required}
                aria-required={required}
                {...rest}
            />
        </div>
    );
}
