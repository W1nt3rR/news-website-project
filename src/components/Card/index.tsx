import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./card.module.scss";

interface Props {
    info: any;
}

export const Card = (props : Props) => {

    const { info } = props;

    // console.log(info.title);

    const navigation = useNavigate();

    const openArticlePage = () => {
        navigation(`/news/${(info.title).replace(/\s/g, '-')}`, {state: info});
    }

    return <div className={style.card}>
        <img src={info.urlToImage} alt="" />
        <h3>{info.title}</h3>
        <div className="filler"></div>
        <Button type="white" text="More Info" onClickFn={openArticlePage}></Button>
    </div>
}