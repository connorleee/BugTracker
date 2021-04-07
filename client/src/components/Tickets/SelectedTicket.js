import React from "react";
import { Card, CardHeader, Row, Col } from "reactstrap";
import moment from "moment";

export default function SelectedTicket({
  selectedTicket,
  assignedDevs,
  comments,
}) {
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
                  </Row>
                  {comments ? (
                    comments.map((comment) => {
                      return (
                        <Row key={comment.id}>
                          <Col>
                            <span>{comment.comment}</span>
                          </Col>
                          <Col>
                            <span>
                              {moment(comment.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          </Col>
                        </Row>
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
