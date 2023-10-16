import React, { useState } from "react";
import axios from "axios";
import DeliveryDriverDashBoard from "./DeliveryDriverDashBoard";

function ApplyForLeaveDD() {

  const [days, setDays] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  var user = JSON.parse(localStorage.getItem("DDInfo"));
  const eid = user.did;
  const fullname = user.fullname;

  async function sendData(e) {
    e.preventDefault();
    var s = new Date(startdate)
    var e = new Date(enddate)

    var date1 = s.getTime()
    var date2 = e.getTime()

    var diff = (date2 - date1)
    var days = Math.round(diff/(1000*60*60*24))
    
    
    
    //console.log(days)

    if ( !days || !startdate || !enddate || !reason) {
      alert("Fields can't be empty");
    } else {
      if(days < 0){
        alert("Invalid dates are selected")
      }
  
      else{
        setDays(days)

        await axios
        .post("http://localhost:8070/leave/addladd", {
          eid,
          fullname,
          days,
          startdate,
          enddate,
          reason,
        })
        .then((res) => {
          if (res.data === "Success") {
            alert("Leave application submitted successfully");
          } else if (res.data === "Invalid") {
            alert("Invalid Id");
          } else if (res.data === "No id") {
            alert("Couldn't find id");
          } else {
            alert("Error in submitting");
          }
        })
        .catch((msg) => {
          alert(msg);
        });
  
      }
      
    }
  }
  return (
    <>
      <div>
        <DeliveryDriverDashBoard></DeliveryDriverDashBoard>
        <div>
          <div className="container1" style={{backgroundColor: "#E8E8E8",} }>
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <br />
                <br />
                <br />
                <div className="card shadow-lg border-0 rounded-lg mt-5" style={{backgroundColor: "#84A9AC",} }>
                  <div className="card-header" style={{backgroundColor: "#5588A3",} }>
                    <h3 className="text-center font-weight-light my-4">
                      Leave Application
                    </h3>
                  </div>
                  <div className="card-body">
                    <form method="post">
                      <div className="form-floating mb-3">
                        <label>Employee Id :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="text"
                          value={user.did}
                          readOnly
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Full name :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          value={user.fullname}
                          type="text"
                          readOnly
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <label>Reason for Leave:</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="textarea"
                          id="reason"
                          name="reason"
                          onChange={(e) => {
                            setReason(e.target.value);
                          }}
                        />
                        {/* <textarea className="form-control"  id="reason" style={"resize: none"} name="reason" rows={"5"} cols={"60"}/> */}
                      </div>

                      

                      <div className="form-floating mb-3">
                        <label>Start-Date :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="date"
                          name="start_date"
                          id="start_date"
                          onChange={(e) => {
                            setStartDate(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>End-Date :</label>
                        <br />
                        <br />
                        <input
                          className="form-control"
                          type="date"
                          name="start_date"
                          id="start_date"
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-floating mb-3">
                        <label>Period of Leave :</label>
                        <br />
                        <br />
                        <input
                          type="number"
                          title="Only Number"
                          min="1"
                          step="1"
                          className="form-control"
                          value = {days}
                          required="required"
                          id="period"
                          name="period"
                        />
                      </div>

                      

                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          onClick={sendData}
                        >
                          Apply Leave
                        </button>
                        <br />
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="reset"
                        >
                          Reset
                        </button>
                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default ApplyForLeaveDD;
