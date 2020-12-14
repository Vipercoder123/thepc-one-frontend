import React, { useState } from 'react';
import SubmissionCard from '../Card/SubmissionCard';
import axios from 'axios'
import './Submissions.css'

function ViewSubmissions(props) {
    window.scrollTo(0,0)
    const [submissionsData,setSubmissionsData]=useState()
    const [filterData,setFilterData]=useState("Departments")
    const darkTheme=props.darkTheme
    let cnt=0
    let link='https://thepc-one.herokuapp.com/api/ccs/submissions'
    let header='Bearer '+(props.token.token)
    if (!submissionsData){
      axios.get(link,{headers: {
        authorization:header}})
              .then(res => {console.log(res.data)
            setSubmissionsData(res.data)}
              ,(error) => {
                console.log(error)
            })
        }


    function SubmissionCardMap(obj){
      cnt=cnt+1
      let idControl='multiCollapseExample'+cnt
        return(<>
            <tr>
            <th scope="row">{cnt}</th>
            <td>{obj.name}</td>
              <td>{obj.depts.join(" ")}</td>
              <td>
              <a class="view-more" data-toggle="collapse" href={"#"+idControl} role="button" aria-expanded="false" aria-controls={idControl}>View More</a>
              </td>
          </tr>
          <div>
          <div class={darkTheme?"card collapse multi-collapse subcards-dark":"card collapse multi-collapse subcards"} id={idControl}>
            <div class="card-body subcards">
            <h5 class="card-title">{obj.name}</h5>
                 <p class="card-text"><b>Registration Number: </b>{obj.regNum}</p>
                 <p class="card-text"><b>Phone Number: </b> {obj.phNum}</p>
                 <p class="card-text"><b>Email: </b>{obj.email}</p>
                 <p class="card-text"><b>Whatsapp: </b>{obj.whatsapp}</p>
                 <p class="card-text"><b>Strengths: </b>{obj.strengths}</p>
                 <p class="card-text"><b>Weaknesses: </b>{obj.weaknesses}</p>
                 <p class="card-text"><b>Why do you want to join THEPC?: </b>{obj.whyDoYouJoin}</p>
            </div>
            </div>
            </div>
            
          </>
        )
    }
    function FilterCardMap(obj){
      cnt=cnt+1
      let idControl='multiCollapseExample'+cnt
        return(
            (obj.depts.includes(filterData))?
            <><tr>
      <th scope="row">{cnt+1}</th>
      <td>{obj.name}</td>
        <td>{obj.phNum}</td>
        <td>
              <a class="view-more" data-toggle="collapse" href={"#"+idControl} role="button" aria-expanded="false" aria-controls={idControl}>View More</a>
              </td>
          </tr>
          <div class={darkTheme?"card collapse multi-collapse subcards-dark":"card collapse multi-collapse subcards"} id={idControl}>
            <div class="card-body subcards">
                <h5 class="card-title">{obj.name}</h5>
                 <p class="card-text"><b>Registration Number: </b>{obj.regNum}</p>
                 <p class="card-text"><b>Phone Number: </b> {obj.phNum}</p>
                 <p class="card-text"><b>Email: </b>{obj.email}</p>
                 <p class="card-text"><b>Whatsapp: </b>{obj.whatsapp}</p>
                 <p class="card-text"><b>Strengths: </b>{obj.strengths}</p>
                 <p class="card-text"><b>Weaknesses: </b>{obj.weaknesses}</p>
                 <p class="card-text"><b>Why do you want to join THEPC?: </b>{obj.whyDoYouJoin}</p>
            </div>
            </div></>:<></>
        )
    }

    function CardsToggle(){
        props.CardsToggle()
    }          

    return (
        <div>
            {/* {submissionsData?submissionsData.map(SubmissionCardMap):<></>} */}
            <select id = "dropdown" onChange={e=>{setFilterData(e.target.value);cnt=0}} class="dropdown btn btn-secondary dropbtn">
                <option className="dropdown-item textWhite" value="Departments">Departments</option>
                <option className="dropdown-item textWhite" value="Design">Design</option>
                <option className="dropdown-item textWhite" value="Media">Media</option>
                <option className="dropdown-item textWhite" value="Tech">Tech</option>
                <option className="dropdown-item textWhite" value="Editorial">Editorial</option>
                <option className="dropdown-item textWhite" value="Finance">Finance</option>
            </select>
            <table class="table subtable table-borderless">
            <thead class="thead-dark">
              <tr>
                <th scope="col">SNo.</th>
                <th scope="col">Name</th>
                {(filterData!="Departments")?<th scope="col">Number</th>:<th scope="col">Departments</th>}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className={darkTheme?"textWhite":""}>
            {(submissionsData)&&(filterData=="Departments")?submissionsData.map(SubmissionCardMap):<></>}
            {(submissionsData)&&(filterData!="Departments")?submissionsData.map(FilterCardMap):<></>}
            </tbody>
          </table>
          <div className="container"><div className="mx-auto text-center mt-2"><button className=" btn btn-lg submitButton backbtn" type="button" onClick={CardsToggle}>Back</button></div></div>
        </div>
    );
}

export default ViewSubmissions