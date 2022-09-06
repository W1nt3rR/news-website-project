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

    return <Layout>
        <img src={info.urlToImage} alt="" />
    </Layout>
}