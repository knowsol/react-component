export const tableContentColumns = [
    { key: "checked", label: "", width: "40px", align: "center", type: "check", fixed: true },
    { key: "voice", label: "듣기", width: "56px", align: "center", type: "icon", iconName: "voice", fixed: true },
    { key: "no", label: "No", width: "48px", align: "center", fixed: true },
    { key: "screen", label: "화면", width: "56px", align: "center", type: "icon", iconName: "play" },
    { key: "memo", label: "메모", width: "56px", align: "center", type: "icon", iconName: "edit" },
    { key: "recordedAt", label: "녹취일자", width: "180px", align: "center" },
    { key: "callTime", label: "CallTime", width: "80px", align: "center" },
    { key: "category", label: "상담유형", width: "96px", align: "center" },
    { key: "phone", label: "전화번호", width: "112px", align: "center" },
    { key: "branch", label: "지점번호", width: "96px", align: "center" },
    { key: "customer", label: "고객명", width: "96px", align: "center" },
    { key: "customerNo", label: "고객번호", width: "112px", align: "center" },
    { key: "workType", label: "업무구분", width: "88px", align: "center" },
];

export const emptyTableRows = [];

export const tableContentRows = Array.from({ length: 11 }, (_, index) => ({
    id: index + 1,
    checked: false,
    no: index + 1,
    recordedAt: "2025-99-99 00:00",
    callTime: "246",
    category: "아이유",
    phone: "23456789",
    branch: "2356",
    customer: "아이유",
    customerNo: "23456789",
    workType: "246",
}));

export const tableContentTotalCount = tableContentRows.length;

export const accordionTableColumns = [
    { key: "toggle", label: "", width: "60px", type: "toggle" },
    { key: "category", label: "title" },
    { key: "subject", label: "title" },
    { key: "writer", label: "title" },
];

export const accordionTableDetailItems = ["첫 번째 아코디언 상세 내용입니다.", "두 번째 아코디언 상세 내용입니다.", "세 번째 아코디언 상세 내용입니다."];

export const accordionTableRows = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    category: "가나다라마바사아자차카타파",
    subject: "가나다라마바사아자차카타파",
    writer: "가나다라마바사아자차카타파",
    details: accordionTableDetailItems,
}));
