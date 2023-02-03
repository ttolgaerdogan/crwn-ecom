import {FormInputLabel, Input, Group} from "./form-input.styles"
import { FC, InputHTMLAttributes } from "react";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {
    
    return (
        <Group className="group">
            <Input className="form-input" {...otherProps}/>

            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === "string" && otherProps.value.length)}>{label}</FormInputLabel>
            )}
        </Group>
    );
} 

export default FormInput;
