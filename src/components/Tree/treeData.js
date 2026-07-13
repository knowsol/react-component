export const LnbTreeData = [
    {
        id: "m1",
        label: "1Depth 메뉴",
    },
    {
        id: "m2",
        label: "1Depth 메뉴",
        active: true,
        open: true,
        children: [
            {
                id: "m3",
                label: "2depth",
                children: [
                    {
                        id: "m4",
                        label: "3depth",
                    },
                    {
                        id: "m5",
                        label: "3depth",
                        children: [
                            {
                                id: "m6",
                                label: "4depth",
                            },
                            {
                                id: "m7",
                                label: "4depth",
                            },
                        ],
                    },
                ],
            },
            {
                id: "m8",
                label: "2depth",
                children: [
                    {
                        id: "m9",
                        label: "3depth",
                    },
                ],
            },
            {
                id: "m10",
                label: "2depth",
            },
        ],
    },
];
