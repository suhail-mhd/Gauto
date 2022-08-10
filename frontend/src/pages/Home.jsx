import React from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import ChatBot from "react-simple-chatbot";

const Home = () => {
  const loc = localStorage.getItem("userInfo");
  const loc1 = JSON.parse(loc);
  var steps = null;

  {
    loc
      ? (steps = [
          {
            id: "1",
            message: `Hai ${loc1.name} Iam Abella . your Personal Chat Assistant.`,
            trigger: "4",
          },
          {
            id: "4",
            message: "What is your problem?",
            trigger: "5",
          },
          {
            id: "5",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
          {
            id: "6",
            message:
              "If You Have A Personal Complaint or You Want To Say Anything To Us Just Mail us in roadsterofficialpvt@gmail.com",
            trigger: "11",
          },
          {
            id: "7",
            message:
              "First login to your Account If You Have One , Next Select Your car , Click Book Now Then You Will Redirect To the Cars Page,There You Can Schedule The Date , After Scheduling Press Book Now Then You Will Redirect to Payment Page There You Can Pay Your Amount After That YOu will Get A Mail",
            trigger: "8",
          },
          {
            id: "8",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
            ],
          },
          {
            id: "9",
            message:
              "When You Completed Your Booking You Can Go Back To Your HomePage There You Can See A Three Dots On The Right Side Click. After That Click On The Booking History Option There You Can See Current Booking Booking History Etc..Thank You",
            trigger: "10",
          },
          {
            id: "10",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
          {
            id: "11",
            options: [
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
        ])
      : (steps = [
          {
            id: "1",
            message:
              "Hai Iam Abella . Roadsters Personal Chat Assistant.Whats Your Name",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "Hi {previousValue}, nice to meet you!",
            trigger: 4,
          },
          {
            id: "4",
            message: "What is your problem?",
            trigger: "5",
          },
          {
            id: "5",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
          {
            id: "6",
            message:
              "If You Have A Personal Complaint or You Want To Say Anything To Us Just Mail us in roadsterofficialpvt@gmail.com",
            trigger: "11",
          },
          {
            id: "7",
            message:
              "First login to your Account If You Have One , Next Select Your car , Click Book Now Then You Will Redirect To the Cars Page,There You Can Schedule The Date , After Scheduling Press Book Now Then You Will Redirect to Payment Page There You Can Pay Your Amount After That YOu will Get A Mail",
            trigger: "8",
          },
          {
            id: "8",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
            ],
          },
          {
            id: "9",
            message:
              "When You Completed Your Booking You Can Go Back To Your HomePage There You Can See A Three Dots On The Right Side Click. After That Click On The Booking History Option There You Can See Current Booking Booking History Etc..Thank You",
            trigger: "10",
          },
          {
            id: "10",
            options: [
              { value: 1, label: "I Have A Personal Complaint", trigger: "6" },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
          {
            id: "11",
            options: [
              {
                value: 2,
                label: "How Can I Check My Booking History",
                trigger: "9",
              },
              { value: 3, label: "How Can I Book A Car", trigger: "7" },
            ],
          },
        ]);
  }

  return (
    <Helmet title="Home">
      <ChatBot
        floating={true}
        //  speechSynthesis={{ enable: true, lang: 'en' }}
        botAvatar="https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8ODY2MjMwNzF8fGVufDB8fHx8&w=1000&q=80"
        recognitionEnable={true}
        steps={steps}
      />
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        {/* <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2 style={{ fontWeight: "bold" }}>
                    Find Your Best Car Here
                  </h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div> */}
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title" style={{ fontWeight: "bold" }}>
                Popular Services
              </h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title" style={{ fontWeight: "bold" }}>
                Hot Offers
              </h2>
            </Col>

            <Col>
              <CarItem />
            </Col>
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      {/* <BecomeDriverSection /> */}

      {/* =========== testimonial section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section> */}

      {/* =============== blog section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
