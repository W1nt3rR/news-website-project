import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./card.module.scss";

interface Props {
    info: any;
}

export const Card = (props : Props) => {

    const { info } = props;
    const maxLength = 50;

    // console.log(info.title);

    const navigation = useNavigate();

    const openArticlePage = () => {
        navigation(`/article/${(info.title).replace(/\s/g, '-')}`, {state: info});
    }

    const truncate = (text: string) => {
        if(text == null)
            return;
        return (text.length > maxLength) ? `${text.slice(0, maxLength - 1)}...` : text;
    }

    return <div className={style.card}>
        <img src={info.urlToImage} alt="" />
        <h3>{truncate(info.title)}</h3>
        <h4>{truncate(info.description)}</h4>
        <div className="filler"></div>
        <Button type="white" text="More Info" onClickFn={openArticlePage}></Button>
    </div>
}