import theme from "@/styles/Theme";

// Level 1~10 칩 색. PILL 행은 bg(배경)+color(글자), DOT 행은 dot(점 색)을 쓴다.
// Level 1만 연한 배경 + 파란 글자, 나머지는 채운 배경 + 흰 글자.
export const chipData = [
    { title: "Status", bg: theme.color.primary[100], color: theme.color.primary[500], dot: theme.color.primary[500] },
    { title: "Status", bg: theme.color.option.state2, color: theme.color.pure.white, dot: theme.color.option.state2 },
    { title: "Status", bg: theme.color.option.state3, color: theme.color.pure.white, dot: theme.color.option.state3 },
    { title: "Status", bg: theme.color.option.state4, color: theme.color.pure.white, dot: theme.color.option.state4 },
    { title: "Status", bg: theme.color.option.state5, color: theme.color.pure.white, dot: theme.color.option.state5 },
    { title: "Status", bg: theme.color.option.state6, color: theme.color.pure.white, dot: theme.color.option.state6 },
    { title: "Status", bg: theme.color.option.state7, color: theme.color.pure.white, dot: theme.color.option.state7 },
    { title: "Status", bg: theme.color.option.state8, color: theme.color.pure.white, dot: theme.color.option.state8 },
    { title: "Status", bg: theme.color.option.state9, color: theme.color.pure.white, dot: theme.color.option.state9 },
    { title: "Status", bg: theme.color.option.state10, color: theme.color.pure.white, dot: theme.color.option.state10 },
];
