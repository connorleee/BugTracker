import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Row } from "reactstrap";

const UsersCell = (props) => {
  let [projectUsers, setProjectUsers] = useState(null);

  useEffect(() => {
    API.getProjectUsers(props.projectId).then((json) => {
      setProjectUsers(json);
    });
  }, [props.projectId, props.selectedProjectId]);

  if (projectUsers && projectUsers.length) {
    return (
      <>
        {projectUsers.map((user) => {
          return (
            <Row key={user.user_id}>
              {/* <a href="#" onClick={(e) => e.preventDefault()}> */}
              <span>
                {user.first_name} {user.last_name}
              </span>
              {/* </a> */}
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
