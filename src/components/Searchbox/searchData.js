export const SearchGroups = [
    {
        title: "Search",
        rows: [
            { label: "Default", state: undefined, required: true, placeholder: "가나다" },
            { label: "Focus", state: "focus", defaultValue: "가나다" },
            { label: "Filled", state: "filled", defaultValue: "가나다" },
            { label: "Disabled", state: "disabled", defaultValue: "가나다" },
            { label: "readonly", state: "readonly", defaultValue: "가나다" },
            { label: "Error", state: "error", defaultValue: "가나다", helptext: "에러문구" },
            { label: "Success", state: "success", defaultValue: "가나다", helptext: "안내문구" },
            { label: "Info", state: "info", defaultValue: "가나다", helptext: "에러 및 안내문구는 인풋 박스 너비에 맞춘다. 길어질경우 줄바꿈 (최대2줄을 넘기지 않는다)" },
        ],
    },
];
