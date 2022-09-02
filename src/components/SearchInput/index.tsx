import style from "./searchInput.module.scss";

interface Props {
    input: string;
    setInput: Function;
}

export const SearchInput = (props: Props) => {

    const { input, setInput } = props;

    return <input className={style.searchInput} type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
}