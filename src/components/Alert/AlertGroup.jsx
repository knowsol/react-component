import Alert from "./Alert";
import { AlertData } from "./alertData";

// 쇼케이스용: alertData의 항목들을 Alert 컴포넌트로 나열한다.
function AlertGroup() {
    return (
        <>
            {AlertData.map((item) => (
                <Alert key={item.title} icon={item.img} title={item.title}>
                    {item.desc}
                </Alert>
            ))}
        </>
    );
}

export default AlertGroup;
