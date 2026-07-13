// Default/Disabled 그룹별로 ON·OFF 스위치 데모를 배치한다. Switch가 받는 prop(disabled·defaultOn)에 맞춰 평평하게 정리.
export const switchData = [
    {
        title: "Default",
        items: [
            { defaultOn: true },
            { defaultOn: false },
        ],
    },
    {
        title: "Disabled",
        items: [
            { defaultOn: true, disabled: true },
            { defaultOn: false, disabled: true },
        ],
    },
];
