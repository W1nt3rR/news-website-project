import style from "./card.module.scss";

interface Props {
    info: any;
}

export const Card = (props : Props) => {

    const { info } = props;

    return <a href={info.url} target="_blank" rel="noreferrer">
        <div className={style.card}>
            <img src={info.urlToImage} alt="" />
            <h3>{info.title}</h3>
        </div>
    </a>
    
}