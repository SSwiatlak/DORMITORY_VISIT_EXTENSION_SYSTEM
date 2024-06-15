import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserVisitsContext } from '../../contexts/UserVisitsContext';
import { Row, Col, Container, Card, Table } from 'react-bootstrap';
import { Calendar } from 'fullcalendar'
import './Home.css';
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



function formatHours(date)
{
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
}

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { userVisits } = useContext(UserVisitsContext);

  const formatTime = (timeString) => {
    return timeString.substr(0, 5); // Przycina string do formatu HH:mm
  };

    const events = userVisits.map(visit => {
        const startDateTimeStr = visit.start_date + "T" + visit.start_time;
        const startDateTime = new Date(startDateTimeStr);

        const endDateTimeStr = visit.end_date + "T" + visit.end_time;
        const endDateTime = new Date(endDateTimeStr);

        return {
            title: visit.guest_first_name + " " + visit.guest_last_name,
            start: startDateTime,
            end: endDateTime,
            backgroundColor: "#2c3e50"
        }

    });

  return (
    <>


      
        <Container className="user_data_container mt-3 mb-5">
          <Row>
            <Col>
            {currentUser && currentUser.user && currentUser.user.first_name && (
              <div>
                <div className='info_text_bold'>
                  <h2><strong>Witaj {currentUser.user.first_name}!</strong></h2>
                </div>
                <div className='info_text'>
                  <h5>Akademik: {currentUser.user.dormitory}</h5>
                </div>
                <div className='info_text'>
                  <h5>Numer pokoju: {currentUser.user.room_number}</h5>
                </div>
              </div>
            )}
            </Col>
          </Row>
        </Container>
    <Container>
      <Row className='row d-flex justify-content-center'>
        <Col>
          {userVisits && userVisits.length > 0 && (
            <div>
              <Row className='mb-3'>
                <h2><strong>Twoje wizyty:</strong></h2>
              </Row>

              <Row>
                <Fullcalendar
                //plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar = {{
                start: "today prev, next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={"90vh"}
                eventColor={"#2c3e50"}
                eventDisplay={"block"}
                events = {events}
                eventDidMount={(info) => {
                    return new bootstrap.Popover(info.el, {
                        title: info.event.title,
                        placement: "auto",
                        trigger: "hover",
                        customClass: "popoverStyle",
                        content:
                          "<p> Godzina rozpoczęcia: " + formatHours(info.event.start) + "<br>Godzina zakończenia: " + formatHours(info.event.end) + "</p>",
                        html: true,
                        });
                        }}
                />
              </Row>
            </div>
          )}
          {userVisits && userVisits.length === 0 && (
            <div>
              <h3>Twoje wizyty:</h3>
              <p>Brak nadchodzących wizyt</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    )
    </>
  );
};


export default Home;
