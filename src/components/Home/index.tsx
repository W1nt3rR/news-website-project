import { useEffect, useState } from "react";
import { newsAPIsearch, newsAPItop } from "../../api/api";
import { Button } from "../Button";
import { Card } from "../Card";
import { Layout, useGlobalNews } from "../Layout";
import { SearchInput } from "../SearchInput";
import { SelectOption } from "../SelectOption";
import style from "./home.module.scss";

export const Home = () => {

    const [ news, setNews ] = useGlobalNews();
    const [ search, setSearch ] = useState("");
    const [ nextPage, setNextPage] = useState(2);
    const [ endOfNews, setEndOfNews ] = useState(false);
    const [ selectedCountry, setSelectedCountry ] = useState("us");
    const [ sort, setSort ] = useState("publishedAt");
    const [ currentNews, setCurrentNews ] = useState("");

    const newsAmmount = 24;

    useEffect(() => {
        getTopNews();
    }, [])

    const fetchNews = async (type: string, loadMore? : boolean) => {
        try {
            let result;
            
            const topHeadlinesParams = {
                country: selectedCountry
            }
            
            const searchParams = {
                sortBy: sort,
                q: search
            }

            if(!loadMore || currentNews !== type) {
                setEndOfNews(false);
                setNextPage(2);
                setCurrentNews(type);
                
                if(type === "search")
                    result = await newsAPIsearch.get("", {params: { page: 1, ...searchParams }});
                else
                    result = await newsAPItop.get("", {params: { page: 1, ...topHeadlinesParams }});

            } else {
                setNextPage(nextPage + 1);

                if(type === "search")
                    result = await newsAPIsearch.get("", {params: { page: nextPage, ...searchParams }});
                else
                    result = await newsAPItop.get("", {params: { page: nextPage, ...topHeadlinesParams }});
            }     

            return result.data.articles;
        } catch (error) {
            console.log(error);
        }
    }

    const loadMoreNews = async () => {
        if(endOfNews)
            return;

        const moreNews = await fetchNews(currentNews, true);
        
        if(moreNews.length < newsAmmount)
            setEndOfNews(true);

        setNews([...news, ...moreNews] as any);
    }

    const getSearchNews = async () => {
        const newNews = await fetchNews("search");
        setNews(newNews);
    }

    const getTopNews = async () => {
        setSearch("");
        const newNews = await fetchNews("top");
        setNews(newNews);
    }

    return <Layout>
        <div className={style.searchContainer}>
            <Button type="coloured" onClickFn={getTopNews} text="Top Headlines"/>
            <SearchInput input={search} setInput={setSearch}/>
            <div>
                <SelectOption setOption={setSort} />
                <Button type="coloured" onClickFn={getSearchNews} text="Search"/>
            </div>
        </div>
            
        <div className={style.newsContainer}>
            {news ? news.map((item: any, index: number) => {
                return <Card key={index} info={item} />
            }) : <h1>No Results</h1>}
        </div>

        <div className={style.pagination}>
            {news && <Button type="coloured" onClickFn={loadMoreNews} text="Load More" />}
        </div>
    </Layout>
}