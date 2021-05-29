import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Row } from "reactstrap";

const UsersCell = (props) => {
  let [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    let isRendered = true;

    API.getProjectUsers(props.projectId).then((json) => {
      if (isRendered === true) setProjectUsers(json);
    });

    return () => {
      isRendered = false;
    };
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
