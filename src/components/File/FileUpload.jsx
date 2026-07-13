import { useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "@/styles/Common";
import { Heading } from "../Title/Title";
import { fieldBox } from "../Field/fieldStyles";
import { Icon } from "@/components/Icon/Icon";

const Box = styled.div`
    ${fieldBox}
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const HiddenInput = styled.input`
    display: none;
`;

// 파일명(선택 전엔 placeholder 회색, 선택 후엔 파일명). 폭을 넘치면 …으로 자른다.
const FileName = styled.span`
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme, $placeholder }) => ($placeholder ? theme.color.neutral[600] : theme.color.neutral[900])};
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 150%;
    letter-spacing: -0.02em;
`;

// "파일첨부" 텍스트 버튼: 박스 없이 파란 글씨 + 업로드 아이콘(링크 스타일).
const UploadBtn = styled.button`
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
    /* line-height를 글씨 크기에 맞춰(=1) 여백을 없애야 아이콘과 세로 중심이 맞는다. */
    line-height: 1;
    color: ${({ theme }) => theme.color.secondary[500]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
`;

const FileUpload = () => {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const openPicker = () => inputRef.current?.click();

    return (
        <Column $mt={24}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                File
            </Heading>
            {/* Box 어디를 눌러도(파일첨부 버튼 포함) 숨긴 input이 열린다. */}
            <Box onClick={openPicker}>
                <HiddenInput ref={inputRef} type="file" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                <FileName $placeholder={!fileName}>{fileName || "파일을 선택하세요"}</FileName>
                <UploadBtn type="button">
                    파일첨부 <Icon name="upload" size="xsmall" />
                </UploadBtn>
            </Box>
        </Column>
    );
};

export default FileUpload;
