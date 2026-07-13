// 버튼 데모 페이지 데이터. 섹션(Primary/Secondary/Tertiary) > 행(label, desc?) > 버튼들(items).
// item: { variant, kind, text?, caption?, iconName?, iconSize?, iconPos?, disabled? }
//  - 화살표(▾ ▴ ↓ ↑)는 유니코드 문자를 text에 포함 → 버튼 글자색을 그대로 따라간다.
//  - iconName은 svg 아이콘(chkbx/refresh 등), group은 붙여 배치할 버튼 묶음.
export const buttonSections = [
    {
        title: "Primary",
        rows: [
            {
                label: "Default",
                items: [
                    { caption: "보조버튼", variant: "primary", kind: "outline", text: "버튼명" },
                    { caption: "주요버튼", variant: "primary", kind: "solidDeep", text: "버튼명", colorToken: "brand.blue" },
                ],
            },
            {
                label: "Disabled",
                items: [
                    { variant: "primary", kind: "outline", text: "버튼명", disabled: true },
                    { variant: "primary", kind: "solidDeep", text: "버튼명", disabled: true },
                ],
            },
        ],
    },
    {
        title: "Secondary",
        boxVariant: "bg",
        labelGap: 8,
        rows: [
            {
                // 첫 줄은 모두 178px. 체크박스는 unChkbx 20px, 글씨와 10px 간격.
                label: "Common",
                items: [
                    { variant: "secondary", kind: "selected", text: "selected", minWidth: "178px", height: "40px" },
                    { variant: "secondary", kind: "outline", text: "default", minWidth: "178px", height: "40px" },
                    { variant: "secondary", kind: "selected", text: "selected", minWidth: "178px", height: "40px", iconSize: "medium", gap: "10px", between: true, checkbox: true },
                    { variant: "secondary", kind: "outline", text: "default", minWidth: "178px", height: "40px", iconSize: "medium", gap: "10px", between: true, checkbox: true },
                    { variant: "secondary", kind: "readonly", text: "read only", minWidth: "178px", height: "40px" },
                    { variant: "secondary", kind: "outline", text: "disabled", minWidth: "178px", height: "40px", disabled: true },
                    { variant: "secondary", kind: "gray", text: "▾ default", minWidth: "178px", height: "40px" },
                ],
            },
            {
                label: "",
                items: [
                    { variant: "secondary", kind: "solid", text: "버튼명 Level 1", height: "36px" },
                    { variant: "secondary", kind: "outlineBlue", text: "버튼명 Level 2", height: "36px" },
                    { variant: "secondary", kind: "solid", text: "버튼", height: "36px", padding: "10px 12px", dropdown: ["옵션 1", "옵션 2", "옵션 3"] },
                    { variant: "secondary", kind: "solid", text: "버튼", height: "36px", padding: "10px 12px", dropdown: ["옵션 1", "옵션 2", "옵션 3"], dropUp: true },
                ],
            },
            {
                // 검색·refresh는 최소 높이 76px — 검색창 입력필드 갯수에 따라 더 늘어날 수 있다.
                label: "Default",
                desc: "검색버튼의 높이는 검색창의 입력필드 갯수에 따라 달라집니다",
                items: [
                    {
                        group: [
                            { variant: "secondary", kind: "solidDeep", text: "검색", minHeight: "76px", colorToken: "brand.blue" },
                            // spin: 클릭하면 아이콘이 3초 동안 회전
                            { variant: "secondary", kind: "iconBox", iconName: "refresh", iconSize: "primary", width: "36px", minHeight: "76px", spin: true },
                        ],
                    },
                    { variant: "secondary", kind: "outlineBlue", text: "검색", minWidth: "66px", minHeight: "73px" },
                ],
            },
            {
                label: "Disabled",
                items: [
                    { variant: "secondary", kind: "solid", text: "버튼명 Level 1", disabled: true, height: "36px" },
                    { variant: "secondary", kind: "outlineBlue", text: "버튼명 Level 2", disabled: true, height: "36px" },
                    {
                        group: [
                            { variant: "secondary", kind: "solidDeep", text: "검색", disabled: true, height: "36px" },
                            { variant: "secondary", kind: "iconBox", iconName: "dis_refresh", iconSize: "primary", disabled: true },
                        ],
                    },
                    { variant: "secondary", kind: "outlineBlue", text: "검색", disabled: true, height: "36px" },
                ],
            },
        ],
    },
    {
        title: "Tertiary",
        rows: [
            {
                // 영문 캡션(txt + icon 등)은 18px(medium).
                label: "Default",
                items: [
                    { caption: "txt + icon", captionSize: "medium", variant: "tertiary", kind: "text", text: "텍스트", iconName: "upload", iconPos: "right" },
                    { caption: "icon + txt", captionSize: "medium", variant: "tertiary", kind: "text", text: "텍스트", iconName: "upload", iconPos: "left" },
                    { caption: "txt", captionSize: "medium", variant: "tertiary", kind: "link", text: "텍스트형 버튼" },
                    {
                        group: [
                            { variant: "tertiary", kind: "more", text: "시간연장" },
                            { variant: "tertiary", kind: "moreLine", text: "시간연장" },
                        ],
                    },
                    { variant: "tertiary", kind: "moreLine", text: "시간연장" },
                ],
            },
            {
                label: "Disabled",
                items: [
                    { caption: "txt + icon", captionSize: "medium", variant: "tertiary", kind: "text", text: "텍스트", iconName: "dis_upload", iconPos: "right", disabled: true },
                    { caption: "icon + txt", captionSize: "medium", variant: "tertiary", kind: "text", text: "텍스트", iconName: "dis_upload", iconPos: "left", disabled: true },
                    { caption: "txt", captionSize: "medium", variant: "tertiary", kind: "link", text: "텍스트형 버튼", disabled: true },
                    { variant: "tertiary", kind: "moreLine", text: "시간연장", disabled: true },
                ],
            },
        ],
    },
];
