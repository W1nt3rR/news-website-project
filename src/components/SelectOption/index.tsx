import style from "./select.module.scss";

interface Props {
    setOption: any;
}

export const SelectOption = (props : Props) => {

    const { setOption } = props;

    return <select className={style.select} name="SortBy" onChange={(e) => {
        setOption(e.target.value)
        // console.log(e.target.value);
    }}>
        <option className={style.option} value="relevancy">Relevance</option>
        <option className={style.option} value="popularity">Popularity</option>
        <option className={style.option} value="publishedAt">Published At</option>
    </select>
}