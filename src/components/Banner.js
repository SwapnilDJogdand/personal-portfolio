import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "FrontEnd Developer", "BackEnd Devloper", "Android Devloper" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                {/* <span className="tagline" >Welcome to my Portfolio</span> */}
                <button className="tagline"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='https://drive.google.com/file/d/1j0y4X_e-n7IM3O5aSunjz3PzQL26YXdE/view?usp=sharing';
                  }}
                > Check Resume</button>
                <h1>{`Hi! I'm Swapnil`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "FrontEnd Developer", "BackEnd Devloper", "Android Devloper" ]'><span className="wrap">{text}</span></span></h1>
                  <p>I am writing to express my strong interest in the Software
                    Developer position. As a recent post graduate with a
                    Master’s degree MCA, I am excited about the opportunity
                    to contribute my skills and enthusiasm to your dynamic
                    team.<br></br>
                    During my academic journey, I developed a solid
                    foundation in programming languages such as Java, C++,
                    and Python, Javascript, and gained hands-on experience
                    in software development through various projects and
                    internships.
                    </p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
