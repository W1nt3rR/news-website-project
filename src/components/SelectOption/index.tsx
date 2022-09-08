import style from "./select.module.scss";

export const SelectOption = () => {
    return <select className={style.select} name="SortBy" id="">
        <option className={style.option} value="idk">Relevance</option>
        <option className={style.option} value="idk">Popularity</option>
    </select>
}