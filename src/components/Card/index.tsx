import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./card.module.scss";

interface Props {
    info: any;
}

export const Card = (props : Props) => {

    const { info } = props;

    const navigation = useNavigate();

    return <div className={style.card}>
        <img src={info.urlToImage} alt="" />
        <h3>{info.title}</h3>
        <Button type="coloured" text="More Info" onClickFn={() => { navigation(`/news/${info.title}`, {state: info})}}></Button>
    </div>
}