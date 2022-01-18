import React from "react";

import UserBlock from "./UserBlock";
import "../../utilities.css";
import "./UserGrid.css";

const UserGrid = (props) => {
  return (
    <>
      <div className="UserGrid-container">
        <div className="u-xlarge">{props.title}:</div>
        {props.users.length > 0 ? (
          <div className="UserGrid-grid">
            {props.users.map((user) => (
              <UserBlock key={`user_${user._id}`} user={user} />
            ))}
          </div>
        ) : (
          <div className="UserGrid-none">no users found</div>
        )}
      </div>
    </>
  );
};

export default UserGrid;
