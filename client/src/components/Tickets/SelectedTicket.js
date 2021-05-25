import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import moment from "moment";
import Modal from "../../components/Modal/Modal";

export default function SelectedTicket({
  selectedTicket,
  assignedDevs,
  comments,
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <h3 className="mb-0">Selected Ticket Info</h3>
        </CardHeader>
        {!selectedTicket ? (
          <div className="m-2">No ticket selected</div>
        ) : (
          <>
            <Row className=" p-2">
              <Col xl="6" className="">
                <Card className="shadow p-4">
                  <h2 className="text-primary">{selectedTicket.title}</h2>
                  <h5 color="primary">
                    Author: {selectedTicket.first_name}{" "}
                    {selectedTicket.last_name}
                  </h5>
                  <p>{selectedTicket.description}</p>

                  <hr />
                  <h5>Assigned Devs </h5>
                  <ul>
                    {assignedDevs ? (
                      assignedDevs.map((dev, index) => {
                        return (
                          <li key={dev.user_id}>
                            {`${dev.first_name} ${dev.last_name}`}
                          </li>
                        );
                      })
                    ) : (
                      <li>No devs assigned</li>
                    )}
                  </ul>

                  <hr />
                  <Row className="mb-2">
                    <Col xl="6"></Col>
                  </Row>
                  <Row>
                    <Col xl="3" className="mr-1 badge badge-primary badge-pill">
                      {selectedTicket.status}
                    </Col>
                    <Col xl="3" className="mr-1 badge badge-primary badge-pill">
                      {selectedTicket.priority}
                    </Col>
                    <Col xl="3" className="mr-1 badge badge-primary badge-pill">
                      {selectedTicket.type}
                    </Col>
                    <Col xl="3">{selectedTicket.time_estimate}</Col>
                  </Row>
                </Card>
              </Col>
              <Col xl="6">
                <Card className="shadow">
                  <CardHeader>
                    <Row className="align-items-center">
                      <h2>Comments</h2>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          onClick={() => setIsCommentOpen(true)}
                          size="sm"
                        >
                          New Comment
                        </Button>
                        <Modal
                          open={isCommentOpen}
                          onClose={() => setIsCommentOpen(false)}
                        >
                          *New comment form*
                        </Modal>
                      </div>
                    </Row>
                  </CardHeader>
                  {comments ? (
                    comments.map((comment) => {
                      return (
                        <Card body className="shadow m-2" key={comment.id}>
                          <CardTitle tag="h5">
                            <span id={comment.author_id} className="">
                              {comment.first_name} {comment.last_name} -{" "}
                            </span>
                            <span className="h6">
                              {moment(comment.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>{" "}
                          </CardTitle>
                          <CardText>{comment.comment}</CardText>
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}
