import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function DismissibleExample({listeSouhait, totalPanier}) {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Row>
      <Col>
        <Button className='btn-dark' onClick={toggleShowA}>
            <span className="material-symbols-outlined mt-1">shopping_cart</span>
            <span className="material-symbols-outlined">expand_more</span>
        </Button>
        <ToastContainer style={{position:'absolute', right:'10px'}} className='toasmessage'>
            <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header style={{background:'#ffca2c'}}>
                    <strong className="me-auto">Votre panier</strong>
                </Toast.Header>
                <Toast.Body style={{background:'#212529', color:'white'}}>
                    <div className='p-1'>
                        <Row className='mb-3'>
                            <Col xs={2}></Col>
                            <Col xs={6}>Nom du produit</Col>
                            <Col xs={4}>Prix / XOF</Col>
                        </Row>
                        <Row>
                        {
                            listeSouhait && listeSouhait.map((i, index) => {
                                return (
                                    <Row key={`prevPan${index}`} className='my-2'>
                                        <Col xs={2} className='d-flex justify-content-center' style={{background:`url(${i && i.image && i.image.url})`, height:'50px', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'10px'}}>

                                        </Col>
                                        <Col xs={6} className='d-flex justify-content-start align-items-center'>
                                            <h5>{i && i.name}</h5>
                                        </Col>
                                        <Col xs={4} className='d-flex justify-content-end align-items-center'>
                                            <h5>{i && i.prix}</h5>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        </Row>
                        <Row className='pt-3'>
                            <hr style={{color:'wite', margin:'0', marginTop:'20px', marginBottom:'20px'}} />
                            <Col className='d-flex justify-content-center align-items-center' xs={8}><h4>Total = </h4></Col>
                            <Col className='d-flex align-items-center' xs={4}><h4>{totalPanier}</h4></Col>
                        </Row>
                    </div>
                    
                </Toast.Body>
            </Toast>
        </ToastContainer>
        
      </Col>
    </Row>
  );
}

export default DismissibleExample;