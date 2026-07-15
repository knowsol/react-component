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
