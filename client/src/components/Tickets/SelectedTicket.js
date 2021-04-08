import React, { useState } from "react";
import { Card, CardHeader, Row, Col, CardTitle, Button } from "reactstrap";
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
          <Row className="align-items-center">
            <h3 className="mb-0">Selected Ticket Info</h3>
          </Row>
        </CardHeader>
        {!selectedTicket ? (
          "No ticket selected"
        ) : (
          <>
            <Row>
              <Col xl="6">
                <Card className="shadow">
                  <Row>
                    <Col xl="6">
                      <h2>Ticket: {selectedTicket.title}</h2>
                      <span color="primary">
                        Author: {selectedTicket.first_name}{" "}
                        {selectedTicket.last_name}
                      </span>
                    </Col>
                    <Col xl="6">{selectedTicket.description}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Assigned Devs: </span>
                      {assignedDevs ? (
                        assignedDevs.map((dev, index) => {
                          return (
                            <span key={dev.user_id}>
                              {(index ? ", " : "") +
                                `${dev.first_name} ${dev.last_name}`}
                            </span>
                          );
                        })
                      ) : (
                        <span>No devs assigned</span>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xl="6">
                <Card className="shadow">
                  <Row>
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
                  {comments ? (
                    comments.map((comment) => {
                      return (
                        <Card key={comment.id}>
                          <CardTitle className="text-muted mb-0">
                            <span id={comment.author_id}>
                              {comment.first_name} {comment.last_name}
                            </span>
                          </CardTitle>
                          <p>
                            <span>
                              {moment(comment.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          </p>

                          <span>{comment.comment}</span>
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
