const News = ({ news, noNews }) => {
  return (
    <div className="news">
      <h1>News</h1>
      <h2>{noNews}</h2>
      {news.slice(0, 5).map((theNews) => {
        return (
          <div className="news-blocks">
            <img className="fit" src={theNews.image} />
            <div className="news-words">
              <h4>{theNews.headline}</h4>
              <div className="summary">
                <p>{theNews.summary}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default News
