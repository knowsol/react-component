import theme from "@/styles/Theme";

// 색 값은 theme 한 곳에서만 관리 → swatch·라벨이 항상 같이 따라감
const colorSections = [
    {
        title: "Primary Colors",
        desc: "노웨어소프트 아이덴티티를 대표하는 색상으로 주요 버튼, 하이라이트, 링크 등에 사용",
        colors: [
            { name: "Blue 500", color: theme.color.primary[500] },
            { name: "Blue 300", color: theme.color.primary[300] },
            { name: "Blue 100", color: theme.color.primary[100] },
        ],
    },
    {
        title: "Secondary Colors",
        desc: "강조 요소, 보조 배경, 차트 구분 등에 사용",
        colors: [
            { name: "Deep Blue 500", color: theme.color.secondary[500] },
            { name: "Deep Blue 300", color: theme.color.secondary[300] },
            { name: "Deep Blue 20", color: theme.color.secondary[20] },
            { name: "Cool gray 50", color: theme.color.secondary.c50 },
            { name: "Cool gray 100", color: theme.color.secondary.c100 },
            { name: "Cool gray 200", color: theme.color.secondary.c200 },
        ],
    },
    {
        title: "Optional Colors",
        desc: "차트/그래프, 배너, 카드에 다양성 부여할 때 사용",
        colors: [
            { name: "State1", color: theme.color.option.state1 },
            { name: "State2", color: theme.color.option.state2 },
            { name: "State3", color: theme.color.option.state3 },
            { name: "State4", color: theme.color.option.state4 },
            { name: "State5", color: theme.color.option.state5 },
            { name: "State6", color: theme.color.option.state6 },
            { name: "State7", color: theme.color.option.state7 },
            { name: "State8", color: theme.color.option.state8 },
            { name: "State9", color: theme.color.option.state9 },
            { name: "State10", color: theme.color.option.state10 },
        ],
    },
];

export default colorSections;
