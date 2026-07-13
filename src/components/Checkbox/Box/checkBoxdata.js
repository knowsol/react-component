// disabled=false인 항목(Unchk/chk)은 클릭으로 체크/해제 토글, disabled 항목은 정적 표시.
// 아이콘은 (disabled, checked) 조합으로 Checkbox 컴포넌트에서 정한다.
export const checkBoxData = [
    { title: "Unchk", disabled: false, defaultChecked: false },
    { title: "chk", disabled: false, defaultChecked: true },
    { title: "Dis_unchk", disabled: true, defaultChecked: false },
    { title: "Dis_chk", disabled: true, defaultChecked: true },
];
