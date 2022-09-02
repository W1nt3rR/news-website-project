import { useEffect, useState } from "react";
import { newsAPI } from "../../api/api";
import { Layout } from "../Layout";
import { SearchInput } from "../SearchInput";
import style from "./home.module.scss";

interface Props {

}

export const Home = (props : Props) => {

    const [ news, setNews ] = useState(JSON.parse(localStorage.getItem("News") as string));
    const [ search, setSearch ] = useState("");

    console.log(search);

    localStorage.setItem("News", JSON.stringify(news));

    useEffect(() => {
        // fetchNews();
    }, [])

    const fetchNews = async () => {
        try {
            const result = await newsAPI.get("top-headlines", {params: { q: "tesla"}});
            const data = result.data.articles;
            console.log(data);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    return <Layout>
        <div>
            <SearchInput input={search} setInput={setSearch}/>
            <button className={style.search}>Search</button>
        </div>
    </Layout>
}