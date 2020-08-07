import React from "react";

const Like = props => {
  return (
      <div className="heart" onClick={props.onClick}>
      {
        !props.liked 
        ? <img src="/public/img/icons/heart-o.svg" alt=""/>
        : <img src="/public/img/icons/heart.svg" alt=""/>
      }
      </div>
  );
};

export default Like;
