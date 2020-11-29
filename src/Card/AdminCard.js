import React, { useState } from 'react'
import "./Card.css"
import axios from 'axios'
import swal from '@sweetalert/with-react'

function AdminCard(props) {
    const id=props.id
    const eventsList=props.eventsList
    const date=props.startDate
    const newDate = date.toString().substring(0,10)
    function setEventsList(val){props.setEventsList(val)}
    function eventsRefresh(){props.eventsRefresh()}

    let link='https://thepc-one.herokuapp.com/api/approveEvent/'+id
    let header='Bearer '+(props.token.token)

    function eventsApprove(){

        axios.post(link+'/true',
            {},
            {
                headers: {authorization:header}
            })
                    .then(res => {
                    }) 
                    swal("Event Approved", "Successfully!", "success",{
                        button:false,
                        timer:2000,
                    });
                    setTimeout(eventsRefresh(),8000)                
          }

    function eventsReject(){
        axios.post(link+'/false',
            {},
            {
                headers: {authorization:header}
            })
                    .then(res => {
                    })
                    swal("Event Rejected", " ", "error",{
                        button:false,
                        timer:2000,
                    });
                    setTimeout(eventsRefresh(),8000)          
          }
        

          function eventsRefresh(){
            axios.get('https://thepc-one.herokuapp.com/api/allEvents')
            .then((response) => {
                setEventsList(response.data);
            }, (error) => {
                console.log(error);
            })
        }


    return (
        <div class="card-container navAfter">
            <div class="float-layout">
                <div class="card-image">
                    <img class="customImage" src="https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"/>
                        <div class="card d-flex ">
                            <div class="card-title">{props.name}</div>
                            <div class="card-desc mb-auto">{props.desc}</div>
                            <div class="d-flex justify-content-between align-items-center custom_footer">
                                <h5 className="card_footerColor">Date : <span className="card_footerColor">{newDate}</span></h5>
                                <h5 className="card_footerColor">Time : <span className="card_footerColor">2-6 PM</span></h5>
                                <div>
                                <button onClick={eventsReject} class="adminReject_button registerButton registerButtonColor float-right btn my-2 my-sm-0 mr-auto" type="button" > <span class="registerText">{'Reject'}</span></button>
                                <button onClick={eventsApprove} class="registerButton registerButtonColor float-right btn my-2 my-sm-0 mr-auto" type="button" > <span class="registerText">{props.buttonText}</span></button> 
                                </div>
                            </div>
                         </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCard