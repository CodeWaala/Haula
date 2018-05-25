import React, { Component } from 'react';
import { Image, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';//
import bg1 from '../../Shared/main_images/main_bg.jpg';
import boxes from '../../Shared/main_images/main_boxes.png';
import step1 from '../../Shared/main_images/step1.jpg';
import step2 from '../../Shared/main_images/step2.jpg';


const personHolder = require('./components/images/person-icon.png')

// const styles = {
//     fontFamily: 'Menlo-Regular, Menlo, monospace',
//     fontSize: 14,
//     color: 'white',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
// }


export class Home extends Component {
    render() {
      return (
        <div className="App">
                <div className='parallax bg1' style={{backgroundColor:"#50dfbf"}}>
                    <div className="row-container-main">
                        <Grid>
                            <Row>
                                <Col>
                                <Image src={bg1} className='boxes' responsive/>;
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    
                    <Link to="/customer" role="button" className="customer-btn">Customer</Link>
                    <Link to="/mover" role="button" className="mover-btn">Mover</Link>
                </div>

                <div className='containerTwo' style={{height: "500px", backgroundColor: "white",display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                    <div class="row-container">
                        <Grid>
                            <Row>
                                <Col>
                                    <div className="boxy">
                                    <Glyphicon glyph="flash" className="icons"/>
                                    <h3 className="text-center">Fast Approach</h3>
                                    <p className="text-center">
                                    We count thirty Rebel ships, Lord Vader. But they're so small they're evading our turbo-lasers! We'll have to destroy them ship to ship. Get the crews to their fighters. Luke, let me know when you're going in. I'm on my way in now... Watch yourself! There's a lot of fire coming from the right side of that deflection tower. I'm on it. Squad leaders, we've picked up a new group of signals. Enemy fighters coming your way.
                                    </p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="boxy">
                                    <Glyphicon glyph="user" className="icons"/>
                                    <h3 className="text-center">Local Help</h3>
                                    <p className="text-center">
                                    Easy, Chewie. Whoa! Whoa! Help! Chewie, you okay? Where is he? I'm okay, pal. Han! Chewie? Lando! Boba Fett?! Boba Fett?! Where? Lando, grab it! Lower it! I'm trying! Whoa! Whoa! Grab me, Chewie! I'm slipping. Grab it! L--Lando. Grab! Grab it! Almost... You almost got it! Hold it! Whoa! Gently now. All... all right. Now easy, easy. Hold me, Chewie. Chewie! Chewie, give me the gun. Don't move, Lando. No, wait! I thought you were blind! It's all right. Trust me. Don't move. All right! A little higher! Just a little higher! Chewie, Pull us up! Come on! Okay... up, Chewie, up!
                                    </p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="boxy">
                                    <Glyphicon glyph="cog" className="icons"/>
                                    <h3 className="text-center">Simple to Use</h3>
                                    <p className="text-center">
                                    Aaargh! Chewie! All right, don't lose your temper. I'll come right back and give you a hand. Solo? No sign of life out there, General. The sensors are in place.You'll know if anything comes around. Commander Skywalker reported in yet? No. He's checking out a meteorite that hit near him. With all the meteor activity in this system, it's going to be difficult to spot approaching ships.
                                    </p>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>

                <div className='stepOne-box' style={{height: "500px", backgroundColor: "white",display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                    <div class="row-containerTwo">
                        <Grid>
                            <Row>
                                <Col>
                                <Image className="stepOne" src={step1} responsive />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Image className="stepTwo" src={step2} responsive />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>

        </div>
      );
    }
  }

  export default Home;