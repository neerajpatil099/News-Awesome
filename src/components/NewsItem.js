import React from 'react'

export default function Newsitem (props) {
    let {title, description, imageUrl, newsUrl,author,publishedAt, source,} = props;
    return (
      <div>
        <div className="card" >
  <img src={imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target='blank' className="btn btn-danger">Read more</a>
    <p> by : {author} <br /> published At : {new Date(publishedAt).toGMTString()} <br /> source : {source} </p>
  </div>
</div>
      </div>
    )
  }

