import { useState } from "react";
import styled from "styled-components";
import Box from "@/components/Box/Box";
import Button from "./Button";
import RefreshButton from "./RefreshButton";
import Dropbox from "@/components/Dropbox/Dropbox";
import { Icon } from "@/components/Icon/Icon";
import { Heading } from "../Title/Title";
import { Row, Column, FormItemsRow, FormGroupRow, FormItemColumn } from "@/styles/Common";

// 행 왼쪽의 고정폭 라벨 (Default / Disabled / Common)
const RowLabel = styled.span`
    flex: 0 0 96px;
    padding-top: 8px;
    font-size: ${({ theme }) => theme.font.title.small};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.color.neutral[900]};
`;

const Caption = styled.p`
    font-size: ${({ theme, $size }) => theme.font.size[$size] || theme.font.size.xsmall};
    color: ${({ theme }) => theme.color.neutral[900]};
    text-align: center;
`;

// 행 상단 안내 문구 (Secondary Default 행)
const Desc = styled.p`
    font-size: ${({ theme }) => theme.font.size.xsmall};
    color: ${({ theme }) => theme.color.neutral[700]};
`;

// 체크박스 버튼: 버튼 전체 어디를 눌러도 체크/해제 토글 (unChkbx ↔ chkbx)
function CheckButtonItem({ item }) {
    const [checked, setChecked] = useState(false);

    return (
        <FormItemColumn>
            {item.caption && <Caption $size={item.captionSize}>{item.caption}</Caption>}
            <Button
                variant={item.variant}
                kind={item.kind}
                between={item.between}
                disabled={item.disabled}
                width={item.width}
                minWidth={item.minWidth}
                height={item.height}
                gap={item.gap}
                padding={item.padding}
                colorToken={item.colorToken}
                onClick={() => setChecked((current) => !current)}
            >
                {item.text}
                <Icon name={checked ? "chkbx" : "unChkbx"} size={item.iconSize || "medium"} />
            </Button>
        </FormItemColumn>
    );
}

// refresh 버튼: 클릭하면 아이콘이 3초 동안 돌아간다.
function SpinButtonItem({ item }) {
    return (
        <RefreshButton
            variant={item.variant}
            kind={item.kind}
            disabled={item.disabled}
            width={item.width}
            minWidth={item.minWidth}
            height={item.height}
            minHeight={item.minHeight}
            padding={item.padding}
            colorToken={item.colorToken}
            iconName={item.iconName}
            iconSize={item.iconSize || "primary"}
        />
    );
}

function ButtonItem({ item }) {
    // group이면 안의 버튼들을 붙여서 렌더
    if (item.group) {
        return (
            <FormGroupRow>
                {item.group.map((inner, index) => (
                    <ButtonItem key={index} item={inner} />
                ))}
            </FormGroupRow>
        );
    }

    // 체크박스 토글 버튼 / 회전 refresh 버튼
    if (item.checkbox) return <CheckButtonItem item={item} />;
    if (item.spin) return <SpinButtonItem item={item} />;

    // dropdown이 있으면: 버튼 겉모양(trigger) + 기존 Dropbox의 열림/선택 기능
    if (item.dropdown) {
        return (
            <FormItemColumn>
                {item.caption && <Caption $size={item.captionSize}>{item.caption}</Caption>}
                <Dropbox
                    options={item.dropdown}
                    dropUp={item.dropUp}
                    trigger={(open, selected) => (
                        <Button variant={item.variant} kind={item.kind} disabled={item.disabled} width={item.width} minWidth={item.minWidth} height={item.height} padding={item.padding} colorToken={item.colorToken}>
                            {/* dropUp이면 메뉴가 위로 뜨므로 화살표 방향을 뒤집는다. */}
                            {selected || item.text} {(item.dropUp ? !open : open) ? "▴" : "▾"}
                        </Button>
                    )}
                />
            </FormItemColumn>
        );
    }

    const icon = item.iconName && <Icon name={item.iconName} size={item.iconSize || "small"} />;

    return (
        <FormItemColumn $justify="space-between">
            {item.caption && <Caption $size={item.captionSize}>{item.caption}</Caption>}
            <Button
                variant={item.variant}
                kind={item.kind}
                between={item.between}
                disabled={item.disabled}
                width={item.width}
                minWidth={item.minWidth}
                height={item.height}
                minHeight={item.minHeight}
                gap={item.gap}
                padding={item.padding}
                colorToken={item.colorToken}
            >
                {item.iconPos === "left" && icon}
                {item.text}
                {item.iconPos !== "left" && icon}
            </Button>
        </FormItemColumn>
    );
}

function ButtonGroup({
    title,
    rows,
    boxVariant = "bgline",
    boxPadding = "32px 40px",
    boxMargin = "24px 0 0",
    stackGap = 32,
    labelGap = 24,
    itemsJustify = "space-between",
}) {
    return (
        <>
            <Heading as="h4" $size="medium" $line>
                {title}
            </Heading>
            <Box variant={boxVariant} padding={boxPadding} margin={boxMargin}>
                <Column $gap={stackGap}>
                    {rows.map((row, rowIndex) => (
                        <Row key={rowIndex} $gap={row.labelGap ?? labelGap}>
                            <RowLabel>{row.label}</RowLabel>
                            <Column $gap={8}>
                                {row.desc && <Desc>{row.desc}</Desc>}
                                <FormItemsRow $justify={row.itemsJustify ?? itemsJustify}>
                                    {row.items.map((item, itemIndex) => (
                                        <ButtonItem key={itemIndex} item={item} />
                                    ))}
                                </FormItemsRow>
                            </Column>
                        </Row>
                    ))}
                </Column>
            </Box>
        </>
    );
}

export default ButtonGroup;
