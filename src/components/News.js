import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News (props) {
        
       const [articles, setArticles] = useState([]);
       const [loading, setLoading] = useState(false);
       const [page, setPage] = useState(1);
       const [totalResults, setTotalResults] = useState(0)
        
       

       const updatePage = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b443ea40044548f69a0f5dab8c458efb&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    
    
    useEffect(() => {
        document.title = props.category + '-NewsAwesome'
        updatePage();
        ;
        // eslint-disable-next-line
    }, [])
    

    const fetchMoreData = async () => {   
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b443ea40044548f69a0f5dab8c458efb&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1) 
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults);
    };


    return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsAwesome - Top {props.category} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={articles.length < props.pageSize && <Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}

News.defaultProps = {
  country: 'us',
  pageSize: 6,
  category: 'general'
 };

 News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
 };

