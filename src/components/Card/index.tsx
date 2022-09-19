import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./card.module.scss";

interface Props {
    info: any;
}

export const Card = (props : Props) => {

    const { info } = props;

    const navigation = useNavigate();

    const maxSentanceLength = 100;

    const openArticlePage = () => {
        navigation(`/article/${(info.title).replace(/\s/g, '-')}`, {state: info});
    }

    const truncateSentance = (text: string) => {
        if(text == null)
            return;

        return (text.length > maxSentanceLength) ? `${text.slice(0, maxSentanceLength - 1)}...` : text;
    }

    return <LazyLoadComponent>
        <div className={style.card}>
            <LazyLoadImage src={info.urlToImage} />
            <h2>{truncateSentance(info.title)}</h2>
            <h4>{truncateSentance(info.description)}</h4>
            <div className="filler"></div>
            <Button type="white" text="More Info" onClickFn={openArticlePage}></Button>
        </div>
    </LazyLoadComponent>
}