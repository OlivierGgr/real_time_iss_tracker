import React from 'react';
import {Card} from 'react-bootstrap';

const News = (props) => {
  return (<div>
    <Card bg="dark" text="white" className='newsBox' >
      <Card.Header className='newsBoxTitle'>{props.title}</Card.Header>
      <Card.Body className='newsBoxContainer'>
          {props.text}
      </Card.Body>
    </Card>
  </div>
  );
}

export default News;
