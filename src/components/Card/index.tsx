import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useGlobalNews } from "../Layout";
import style from "./card.module.scss";

interface Props {
    index: number;
}

export const Card = (props : Props) => {

    const [ news ] = useGlobalNews();
    const navigation = useNavigate();
    const { index } = props;
    const maxLength = 100;

    const openArticlePage = () => {
        navigation(`/article/${(news[index].title).replace(/\s/g, '-')}`, {state: index});
    }

    const truncate = (text: string) => {
        if(text == null)
            return;
        return (text.length > maxLength) ? `${text.slice(0, maxLength - 1)}...` : text;
    }

    return <div className={style.card}>
        <img src={news[index].urlToImage} alt="" />
        <h3>{truncate(news[index].title)}</h3>
        <h4>{truncate(news[index].description)}</h4>
        <div className="filler"></div>
        <Button type="white" text="More Info" onClickFn={openArticlePage}></Button>
    </div>
}