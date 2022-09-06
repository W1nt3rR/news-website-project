import { useLocation } from "react-router-dom"
import { Layout } from "../Layout"
import style from "./article.module.scss"

interface Props {

}

interface news {
    [key: string]: any
}

export const ArticlePage = (props: Props) => {

    const location = useLocation();

    const info : news = location.state as object;

    console.log(info);

    return <Layout>
        <div className={style.newsContainer}>
            <img src={info.urlToImage} alt="" />
            <h1>{info.title}</h1>
            <h5>{info.publishedAt}</h5>
            <h5>By: {info.author}</h5>
            <p>{info.description}</p>
            <p>{info.content}</p>

        </div>
    </Layout>
}