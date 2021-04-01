import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Row } from "reactstrap";

const UsersCell = (props) => {
  let [projectUsers, setProjectUsers] = useState(null);

  let getProjectUsersUrl = `http://localhost:3001/api/userProjects/${props.projectId}`;

  useEffect(() => {
    API.getProjectUsers(getProjectUsersUrl).then((json) => {
      setProjectUsers(json);
    });
  }, [getProjectUsersUrl]);

  if (projectUsers.length) {
    return (
      <>
        {projectUsers.map((user) => {
          return (
            <Row>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <span id={user.user_id}>
                  {user.first_name} {user.last_name}
                </span>
              </a>
            </Row>
          );
        })}
      </>
    );
  }

  return (
    <>
      <Row>
        <span>No Users Assigned</span>
      </Row>
    </>
  );
};

export default UsersCell;
