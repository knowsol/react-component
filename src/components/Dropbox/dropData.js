const singleOptions = ["선택1", "선택2", "선택3", "선택4", "선택5"];
const multiItems = ["항목1", "항목2", "항목3", "항목4"];

export const dropData = [
    {
        title: "Drop",
        rows: [
            {
                label: "Default",
                boxes: [{ state: undefined, placeholder: "입력하세요", options: singleOptions }],
            },
            {
                label: "Focus",
                boxes: [
                    { state: "focus", defaultOpen: true, value: "선택2", options: singleOptions },
                    {
                        state: "focus",
                        defaultOpen: true,
                        multiple: true,
                        allLabel: "전체",
                        options: multiItems,
                        defaultChecked: ["항목1", "항목2", "항목3"],
                    },
                ],
            },
            {
                label: "Filled",
                boxes: [{ state: "filled", value: "가나다", options: singleOptions }],
            },
            {
                label: "Disabled",
                boxes: [{ state: "disabled", value: "가나다", options: singleOptions }],
            },
            {
                label: "Readonly",
                boxes: [{ state: "readonly", value: "가나다", options: singleOptions }],
            },
            {
                label: "Error",
                boxes: [{ state: "error", value: "가나다", options: singleOptions, helptext: "에러문구" }],
            },
        ],
    },
];
