import React from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import slugify from 'slugify'

import './description.scss'
import Steps from './Steps'

const Description = ({trip})=>{

  return <div>
  <Container>
    <Row className="infos-container">
        <Col md={6} className="stats-container">Statistiques
        <Container>
          <Row>
            <Col>Durée</Col>
            <Col>Distance</Col>
          </Row>
          <Row>
            <Col>{trip.duration} jours</Col>
            <Col>12000 km</Col>
          </Row>
          <Row>
            {trip.categories.map(category =>{
              return <Col key={category.id}>{category.entitled}</Col>
            })}
          </Row>
        </Container> 
        </Col>

        <Col md={6} className="resume-container">
        Description du voyage
        <p>{trip.summary}</p>
        </Col>
    </Row>
    <Row >
    <Col>
    {/*On crée la map et on la centre sur la position de la première étape */}
    <MapContainer center={[trip.steps[0].latitude, trip.steps[0].longitude]} zoom={11} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {/*Ajout d'un marqueur pour chaque étape du trip  TODO: CSS dans le popup pour gérer sa taille et celle de l'image*/}
  {trip.steps.map(step =>{
    // Je prépare de quoi faire un lien vers une ancre de la page (format: #id)
    const sluggedTitleAsAnchor = '#' + slugify(step.title, {lower:true});

    return <Marker key={step.id} position={[step.latitude, step.longitude]}>
      <Popup>
        <Card >
          <Card.Img src={step.photos[0].url} style={{height:'10vh'}}/>
          <Card.Body>
            <Card.Title> {step.title}</Card.Title>
            <Card.Subtitle>{step.date}</Card.Subtitle>
            <Button variant="link" href={sluggedTitleAsAnchor}> Voir le détail</Button>
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  })}
  </MapContainer>
    </Col>
    </Row>
    <Row>
      <Steps steps= {trip.steps}/>
    </Row>
  </Container>




  
  </div>
}


export default Description