export const DatepickerGroups = [
    {
        title: "Datepicker",
        rows: [
            { label: "Default", state: undefined, placeholder: "2025-99-99" },
            { label: "Focus", state: "focus", defaultValue: "2025-99-99" },
            { label: "Filled", state: "filled", defaultValue: "2025-99-99" },
            { label: "Disabled", state: "disabled", defaultValue: "2025-99-99" },
            { label: "readonly", state: "readonly", defaultValue: "2025-99-99" },
            { label: "Error", state: "error", defaultValue: "2025-99-99" },
        ],
    },
];
// 헤더가 붙는 모드별 컬럼: 년월일 / 범위(일~일) / 에러 / 년월.
// Datepicker가 받는 prop(state·placeholder·defaultValue·range·view)에 맞춰 평평하게 정리.
export const TitleDatepickerGroups = [
    { title: "년월일 선택", placeholder: "YYYY-MM-DD", defaultValue: "2026-07-15" },
    { title: "일~일 선택", placeholder: "YYYY-MM-DD", range: true },
    { title: "Error", placeholder: "YYYY-MM-DD", state: "error", range: true, defaultValue: "2026-07-15 ~ 2026-07-10", helptext: "시작일은 종료일보다 늦을 수 없습니다." },
    { title: "년월 선택", placeholder: "YYYY-MM", view: "months" },
];
