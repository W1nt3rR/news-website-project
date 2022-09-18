import { useEffect, useState } from "react";
import { newsAPIevery, newsAPItop } from "../../api/api";
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

    const newsAmmount = 10;

    useEffect(() => {
        handleFirstLoad();
    }, [])

    const searchParams = {
        sortBy: sort,
        q: search
    }

    const topHeadlinesParams = {
        country: selectedCountry
    }

    const commonParams = {
        page: nextPage
    }

    const fetchTopNews = async (loadMore? : boolean) => {
        try {
            let result;
            
            if(currentNews !== "top" || !loadMore) {
                setCurrentNews("top");
                setEndOfNews(false);
                setNextPage(2);
                result = await newsAPItop.get("", {params: { page: 1, ...topHeadlinesParams }});
            } else {
                setNextPage(nextPage + 1);
                result = await newsAPItop.get("", {params: { ...commonParams, ...topHeadlinesParams }});
            }

            return result.data.articles;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSearchNews = async (loadMore? : boolean) => {
        try {
            if(!search) return;

            let result;

            if(currentNews !== "every" || !loadMore) {
                setCurrentNews("every");
                setEndOfNews(false);
                setNextPage(2);
                result = await newsAPIevery.get("", {params: { page: 1, ...searchParams }});
            } else {
                setNextPage(nextPage + 1);
                result = await newsAPIevery.get("", {params: { ...commonParams, ...searchParams }});
            }
            
            return result.data.articles;
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadMore = async () => {
        if(endOfNews) return;

        let moreNews;

        if(currentNews === "top")
            moreNews = await fetchTopNews(true);
         else if (currentNews === "every")
            moreNews = await fetchSearchNews(true);
        
        if(moreNews.length < newsAmmount)
            setEndOfNews(true);

        setNews([...news, ...moreNews] as any);
    }

    const handleSearchClick = async () => {  
        const newNews = await fetchSearchNews();
        setNews(newNews);
    }

    const handleFirstLoad = async () => {
        setSearch("");
        const newNews = await fetchTopNews();
        setNews(newNews);
    }

    return <Layout>
        <div className={style.searchContainer}>
            <Button type="coloured" onClickFn={handleFirstLoad} text="Top Headlines"/>
            <SearchInput input={search} setInput={setSearch}/>
            <div>
                <SelectOption setOption={setSort} />
                <Button type="coloured" onClickFn={handleSearchClick} text="Search"/>
            </div>
        </div>
            
        <div className={style.newsContainer}>
            {news && news.map((item: any, index: number) => {
                return <Card key={index} index={index} />
            })}
        </div>

        <div className={style.pagination}>
            <Button type="coloured" onClickFn={handleLoadMore} text="Load More" />
        </div>
    </Layout>
}