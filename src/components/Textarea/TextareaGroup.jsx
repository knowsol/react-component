import Textarea from "./Textarea";
import { TextareaData } from "./textareaData";

function TextareaGroup() {
    return TextareaData.map((textarea) => <Textarea key={textarea.title} {...textarea} />);
}

export default TextareaGroup;
