import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Row } from "reactstrap";

const UsersCell = (props) => {
  let [projectUsers, setProjectUsers] = useState(null);

  let getProjectUsersUrl = `http://localhost:3001/api/userProjects/${props.projectId}`;

  useEffect(() => {
    console.log(getProjectUsersUrl);
    API.getProjectUsers(getProjectUsersUrl).then((json) => {
      const { user_id } = json;

      console.log(user_id);
    });
  }, [getProjectUsersUrl]);

  if (projectUsers) {
    return (
      <>
        {projectUsers.map((user) => {
          return (
            <Row>
              <span>{user.user_id}</span>
            </Row>
          );
        })}
      </>
    );
  }

  return <></>;
};

export default UsersCell;
