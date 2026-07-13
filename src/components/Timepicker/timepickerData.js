export const TimepickerGroups = [
    {
        title: "Timepicker",
        rows: [
            { label: "Default", state: undefined, placeholder: "99:99" },
            { label: "Focus", state: "focus", defaultValue: "99:99" },
            { label: "Filled", state: "filled", defaultValue: "99:99" },
            { label: "Disabled", state: "disabled", defaultValue: "99:99" },
            { label: "readonly", state: "readonly", defaultValue: "99:99" },
            { label: "Error", state: "error", defaultValue: "99:99" },
        ],
    },
];

export const TitleTimepickerGroups = [
    { title: "시간선택", placeholder: "00:00", defaultValue: "00:00" },
    { title: "시작~종료시간", placeholder: "00:00", range: true },
    { title: "Error", placeholder: "00:00", range: true, defaultValue: "17:00 ~ 16:00" },
];
