import { useState } from "react";
import styled from "styled-components";
import { Column } from "@/styles/Common";
import { Heading } from "../Title/Title";
import { fieldBox, fieldStateStyle } from "../Field/fieldStyles";

const TextField = styled.textarea`
    ${fieldBox}
    ${fieldStateStyle()}
    width: 100%;
    height: ${({ $height }) => $height ?? "auto"};
    min-height: ${({ $minHeight }) => $minHeight};
    resize: ${({ $resize }) => $resize};
    padding: ${({ $padding }) => $padding};
    border-radius: 6px;
`;

const CountNum = styled.p`
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.neutral[600]};
    text-align: right;
`;

const Textarea = ({
    title,
    state,
    total = 999,
    placeholder = "입력하세요",
    value: controlledValue,
    defaultValue = "",
    onChange,
    height,
    minHeight = "72px",
    resize = "vertical",
    padding = "6px 12px",
    marginTop = 24,
    gap = 16,
    showCount = true,
    className,
    ...textareaProps
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const handleChange = (event) => {
        if (controlledValue === undefined) setInternalValue(event.target.value);
        onChange?.(event);
    };

    return (
        <Column className={className} $mt={marginTop} $gap={gap}>
            {title && (
                <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                    {title}
                </Heading>
            )}
            <TextField
                $state={state}
                disabled={state === "disabled"}
                readOnly={state === "readonly"}
                placeholder={placeholder}
                value={value}
                maxLength={total}
                onChange={handleChange}
                $height={height}
                $minHeight={minHeight}
                $resize={resize}
                $padding={padding}
                {...textareaProps}
            />
            {showCount && (
                <CountNum>
                    {value.length} / {total}
                </CountNum>
            )}
        </Column>
    );
};

export default Textarea;
