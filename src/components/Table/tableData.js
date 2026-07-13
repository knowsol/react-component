export const typoTableHead = ["Scale", "weight", "Size/Line-height", "Letter-spacing", "Usage"];

export const typoTableBody = [
    ["H1", "semibold", "24/32", "-2%", "페이지 타이틀", "서비스의 최상위 화면 제목에 사용합니다."],
    ["H2", "semibold/medium", "18/26", "-2%", "섹션 타이틀", "콘텐츠 섹션을 구분하는 제목에 사용합니다."],
    ["H3", "medium/regular", "15/24", "-2%", "LNB 타이틀, 서브 타이틀", "보조 제목이나 메뉴 그룹명에 사용합니다."],
    ["Body1", "semibold/medium/regular", "15/24", "-2%", "강조 및 기본 폰트", "일반 본문과 주요 정보 표시에 사용합니다."],
    ["Body2", "medium/regular", "14/22", "-2%", "라벨 및 안내문구", "입력 필드 라벨과 짧은 설명에 사용합니다."],
    ["Caption1", "medium/regular", "12/18", "-2%", "안내 및 그래프 타이틀", "보조 정보나 작은 설명 텍스트에 사용합니다."],
    ["Link", "regular", "15/24", "-2%", "클릭 가능한 텍스트", "텍스트 링크에 사용합니다."],
];

export const tableHeaderData = {
    pageTitle: "Title",
    bookmarked: false,
    breadcrumbs: ["Dep4", "Dep4", "Dep4", "Dep4", "Dep4"],
    rows: [
        {
            title: "제목",
            line: true,
            required: true,
            count: "999건",
            desc: "정보입니다정보입니다.",
            actions: [{ text: "Disabled", disabled: true }, { text: "Disabled", disabled: true }, { text: "Default" }, { text: "Default" }],
        },
        {
            title: "검색결과",
            line: false,
            count: "999건",
            desc: "더블클릭으로 수정",
            actions: [{ text: "버튼" }, { text: "버튼" }, { text: "버튼" }, { text: "버튼" }],
            selects: [
                { value: "전체", options: ["전체", "옵션1", "옵션2"] },
                { label: "상세분류", value: "전체", options: ["전체", "옵션1", "옵션2"] },
            ],
        },
        {
            info: true,
            title: "타이틀",
            line: false,
            required: true,
            count: "999건",
            desc: "정보입니다정보입니다.",
            actions: [{ text: "버튼" }, { text: "버튼" }, { text: "버튼" }, { text: "버튼" }],
        },
    ],
    approvalLine: {
        checked: false,
        label: "업무 결재선",
    },
};
