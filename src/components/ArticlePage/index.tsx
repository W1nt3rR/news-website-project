import { useLocation } from "react-router-dom"
import { Layout, useGlobalNews } from "../Layout"
import style from "./article.module.scss"

export const ArticlePage = () => {

    const [ news ] = useGlobalNews();
    const location = useLocation();
    const index : number = location.state as number;

    return <Layout>
        <div className={style.newsContainer}>
            <img src={news[index].urlToImage} alt="" />
            <h1>{news[index].title}</h1>
            <h5>{news[index].publishedAt}</h5>
            <h5>By: {news[index].author}</h5>
            <p>{news[index].description}</p>
            <p>{news[index].content}</p>
        </div>
    </Layout>
}