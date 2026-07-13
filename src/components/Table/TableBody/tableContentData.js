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

export const tableContentTotalCount = 100;

export const tableContentRows = Array.from({ length: 10 }, (_, index) => ({
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
