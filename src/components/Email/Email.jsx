import { useState } from "react";
import styled from "styled-components";
import { fieldBox, fieldStateStyle, bareInput } from "../Field/fieldStyles";
import { IconButton } from "@/components/Icon/Icon";
import Dropbox from "../Dropbox/Dropbox";

// @ 뒤 도메인 선택 목록. 맨 끝 "직접입력"을 고르면 도메인 칸이 텍스트 입력창으로 바뀐다.
const DOMAINS = ["gmail.com", "naver.com", "daum.net", "kakao.com", "nate.com"];
const CUSTOM = "직접입력";

// Search와 동일하게 div가 프레임(테두리·상태색)을 갖고, 안에 [아이디 input] @ [도메인] 을 한 줄로.
const Box = styled.div`
    ${fieldBox}
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: text;

    ${fieldStateStyle("&:focus-within")}
`;

// 아이디·도메인(직접입력) 공용 입력칸: Box 프레임 안에 얹히는 벌거벗은 input(bareInput 공통).
const Input = styled.input`
    ${bareInput}
`;

const At = styled.span`
    flex-shrink: 0;
    color: ${({ theme }) => theme.color.neutral[900]};
`;

function Email({ state, placeholder, defaultValue = "", ...rest }) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";

    const [value, setValue] = useState(defaultValue); // 아이디(@ 앞)
    const [custom, setCustom] = useState(false); // 직접입력 모드 여부
    const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
    const [domain, setDomain] = useState(""); // 직접입력한 도메인

    // Dropbox에서 "직접입력"을 고르면 도메인 칸을 텍스트 입력으로 전환한다. (그 외 도메인은 Dropbox가 내부 표시)
    const handleSelect = (nextDomain) => {
        setSelectedDomain(nextDomain);
        if (nextDomain === CUSTOM) {
            setDomain("");
            setCustom(true);
            return;
        }
        setCustom(false);
    };

    return (
        <Box $state={state}>
            <Input value={value} placeholder={placeholder} disabled={disabled} readOnly={readonly} onChange={(e) => setValue(e.target.value)} {...rest} />
            <At>@</At>
            {custom ? (
                <>
                    <Input autoFocus value={domain} placeholder="도메인 입력" disabled={disabled} readOnly={readonly} onChange={(e) => setDomain(e.target.value)} />
                    {/* mousedown 기본동작(blur)을 막아 클릭 시 포커스 흔들림 없이 목록으로 복귀 */}
                    <IconButton
                        name="down"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setSelectedDomain(DOMAINS[0]);
                            setCustom(false);
                        }}
                        aria-label="도메인 목록으로"
                    />
                </>
            ) : (
                <Dropbox bare state={state} options={[...DOMAINS, CUSTOM]} value={selectedDomain} onSelect={handleSelect} />
            )}
        </Box>
    );
}

export default Email;
