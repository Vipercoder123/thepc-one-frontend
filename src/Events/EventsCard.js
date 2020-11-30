import React, { useState } from 'react'
import Card from '../Card/Card'

function EventsCard(props){
    const userID=props.userID
    const mDate=props.mDate
    const buttonText=props.buttonText
    const userType=props.userType
    const eventsList=props.eventsList
    function handleEventState(val){props.handleEventState(val)}
    function eventStart(val){props.eventStart(val)}

    function MemberCards(data){
        let liveEventsList=LiveEventsCheck(data)
        let reqEventsList=ReqEventsCheck(data)
        let pastEventsList=PastEventsCheck(data)
        return(
            <>
            {(reqEventsList.length!=0)?<h1 className="event-headers">Event Requests</h1>: <></>}
            {(reqEventsList.length!=0)?reqEventsList.map(ReqCardsRender): <></>}
            {(liveEventsList.length!=0)?<h1 className="event-headers">Live Events</h1>: <></>}
            {(liveEventsList.length!=0)?liveEventsList.map(LiveCardsRender):<></>}
            {(pastEventsList.length!=0)?<h1 className="event-headers">Past Events</h1>: <></>}
            {(pastEventsList.length!=0)?pastEventsList.map(PastCardsRender): <></>}
            </>
        )
    }

    function LiveEventsCheck(data){
        let liveEventsList=[]
        if(userType==-1){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            let regUsersList=[]
            regUsersList=obj.regUsers.map(listMapFunction)
            function listMapFunction(obj){return obj._id}
            if((obj.approved)&&(regUsersList.includes(userID))&&(d1<=d2))
            liveEventsList.push(obj)
        })}
        if(userType==0){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            let regUsersList=[]
            regUsersList=obj.regUsers.map(listMapFunction)
            function listMapFunction(obj){return obj._id}
            if((obj.approved)&&(regUsersList.includes(userID))&&(d1<=d2))
            liveEventsList.push(obj)
        })}
        if(userType==1){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            let regUsersList=[]
            regUsersList=obj.regUsers.map(listMapFunction)
            function listMapFunction(obj){return obj._id}
            if((obj.approved)&&(d1<=d2))
            liveEventsList.push(obj)
        })}
        return(liveEventsList)
    }
    
    function ReqEventsCheck(data){
        let reqEventsList=[]
        if(userType==0){
        data.map((obj)=>{
            if(obj.createdBy.length!=0){
            let createdBy=[]
            createdBy=obj.createdBy[0]._id
            if ((userType==0)&&(createdBy==userID)&&(obj.approved==false))   
            reqEventsList.push(obj)
        }})}
        return(reqEventsList)
    }

    function PastEventsCheck(data){
        let pastEventsList=[]
        if(userType==-1){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            let regUsersList=[]
            regUsersList=obj.regUsers.map(listMapFunction)
            function listMapFunction(obj){return obj._id}
            if((obj.approved)&&(regUsersList.includes(userID))&&(d1<=d2))
            pastEventsList.push(obj)
        })}
        if(userType==0){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            if((obj.approved)&&(d1<=d2))
            pastEventsList.push(obj)
        })}
        if(userType==1){
        data.map((obj)=>{
            const d1=new Date(obj.eventStart)
            const d2=new Date() 
            if((obj.approved)&&(d1<=d2))
            pastEventsList.push(obj)
        })}
        return(pastEventsList)
    }

    function LiveCardsRender(obj){
        if(userType==-1){
            return(
                <Card name={obj.eventName} image={obj.eventImg} desc={obj.eventDesc} startDate={obj.eventStart} id={obj._id} mDate={mDate} buttonText={'Start'} eventStart={eventStart} event={obj} />
            )
        }
        if(userType==0){
            return(
                <Card name={obj.eventName} image={obj.eventImg} desc={obj.eventDesc} startDate={obj.eventStart} id={obj._id} mDate={mDate} buttonText={'Start'} eventStart={eventStart} event={obj}/>
            )
        }
        if(userType==1){
            return(
                <Card name={obj.eventName} image={obj.eventImg} desc={obj.eventDesc} startDate={obj.eventStart} id={obj._id} mDate={mDate} buttonText={'Start'} eventStart={eventStart} event={obj}/>
            )
        }  
    }
    function PastCardsRender(obj){
            return(
                <Card name={obj.eventName} image={obj.eventImg} desc={obj.eventDesc} startDate={obj.eventStart} id={obj._id} mDate={mDate}/>
            ) 
    }
    function ReqCardsRender(obj){
        if(userType==0){
            return(
                <Card name={obj.eventName} image={obj.eventImg} desc={obj.eventDesc} startDate={obj.eventStart} id={obj._id} mDate={mDate} buttonText='Pending' />
            )
        }
    }

    return(
        <>
        {userType==0?<button className="btn btn-lg btn-block create-event" type="button" onClick={()=>handleEventState('Create')}>Create Event</button>:<></>}
        {eventsList?MemberCards(eventsList):<></>}
        </>
    )
}

export default EventsCard