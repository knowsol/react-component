import Checkbox from "./Box/Checkbox";
import { checkBoxData } from "./Box/checkBoxdata";
import Check from "./Basic/Check";
import { checkData } from "./Basic/checkData";
import Radio from "@/components/Radio/Radio";
import { radioData } from "@/components/Radio/radioData";
import { Row, Column } from "@/styles/Common";

// 쇼케이스용: 데이터 파일의 상태 조합(enabled/disabled × checked)을 나열한다.
const toRadioOptions = (items) => items.map((item) => ({ label: item.title, value: item.title, disabled: item.disabled }));
const defaultRadioValue = (items) => items.find((item) => item.defaultChecked)?.title ?? null;

const CheckGroup = () => {
    // 라디오는 한 그룹에 선택이 하나뿐이라, enabled/disabled 상태별로 그룹을 나눠 보여준다.
    const enabledRadio = radioData.filter((item) => !item.disabled);
    const disabledRadio = radioData.filter((item) => item.disabled);

    return (
        <Column $gap={24}>
            <Row $gap={20}>
                {checkBoxData.map((item) => (
                    <Checkbox key={item.title} label={item.title} disabled={item.disabled} defaultChecked={item.defaultChecked} />
                ))}
            </Row>
            <Row $gap={20}>
                {checkData.map((item) => (
                    <Check key={item.title} label={item.title} disabled={item.disabled} defaultChecked={item.defaultChecked} />
                ))}
            </Row>
            <Row $gap={20}>
                <Radio options={toRadioOptions(enabledRadio)} defaultValue={defaultRadioValue(enabledRadio)} />
                <Radio options={toRadioOptions(disabledRadio)} defaultValue={defaultRadioValue(disabledRadio)} />
            </Row>
        </Column>
    );
};

export default CheckGroup;
