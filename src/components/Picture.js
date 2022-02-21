import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img loading="lazy" src={data.src.large} alt="" />
      </div>
      <p>
        Download Image:
        <a href={data.src.large} target="_blank" rel="noreferrer noopener">
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Picture;
