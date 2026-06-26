import theme from "@/styles/Theme";

const colorBoxData = {
    basic: [
        {
            title: "기본 (Base / Primary)",
            name: "Color900 / #111111",
            color: theme.color.neutral[900],
        },
        {
            title: "기본 (Base / Primary)",
            name: "Color800 / #333333",
            color: theme.color.neutral[800],
        },
        {
            title: "보조 (Secondary / Subtext)",
            name: "Color700 / #666666",
            color: theme.color.neutral[700],
        },
        {
            title: "비활성(Disabled / Placeholder)",
            name: "Color600 / #929292",
            color: theme.color.neutral[600],
        },
    ],
    semantic: [
        {
            title: "Infomation",
            name: "Blue500 / #339CD5",
            color: theme.color.semantic.info,
        },
        {
            title: "Success",
            name: "Deep Blue 500 / #457CE1",
            color: theme.color.semantic.success,
        },
        {
            title: "Error",
            name: "Error / #E24949",
            color: theme.color.semantic.error,
        },
    ],
};

export default colorBoxData;
