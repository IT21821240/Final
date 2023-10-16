import React, { useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './form.css';
import './index.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function CreateUser() {
    const formArray = [1, 2, 3,4];
    const [formNo, setFormNo] = useState(formArray[0])
    const [code,setCode] = useState()
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [value,setValue] = useState()
    const [couponQuantity,setQuantity] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [dateError, setDateError] = useState();
    const navigate = useNavigate()

 
  

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 20) {
      setName(inputName);
    } else {
      setName('');
      toast.error('Coupon name must not exceed 20 characters.');
    }
  }

  const handleDescriptionChange = (e) => {
    const inputDescription = e.target.value;
    if (inputDescription.length <= 50) {
      setDescription(inputDescription);
      // setDescriptionError('');
    } else {
      setDescription('');
      toast.error('Coupon description must not exceed 50 characters.');
    }
  }

  const handleStartDateChange = (e) => {
    const inputStartDate = e.target.value;
    setStartDate(inputStartDate);
    validateDates(inputStartDate, endDate);
  }

  const handleEndDateChange = (e) => {
    const inputEndDate = e.target.value;
    setEndDate(inputEndDate);
    validateDates(startDate, inputEndDate);
  }

  const validateDates = (start, end) => {
    if (start && end && new Date(start) > new Date(end)) {
      toast.error('Starting date cannot be later than the ending date.');
    } else {
      setDateError('');
    }
  };

  const next = () => {
    if (formNo === 1 && code && name && description ) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && value &&  startDate && endDate) {
    }else {
      toast.error('Please fillup all input field')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    if (value &&  startDate && endDate  ) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }

  const Submit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:8070/promotion/createUser",{code,name,value,description,couponQuantity,startDate,endDate})
            .then(result => {
                
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Coupon has been successfully created',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(result)
                navigate('/coupon')
            })
            .catch(err => console.log(err))
    }
  return (
    <div>
      <ToastContainer />
      {
        formNo === 1 && <div>
        <div className="container">
        
        <form >
          <header>Coupon Creation</header><br></br>
        <div className="form first">
                    <div className="fields">
                        <div className="input-field">
                            <label>Coupon Code  : </label>
                            <input type="text"  onChange={(e) => setCode(e.target.value)} required/>
                        </div>
                        <div className="input-field">
                            <label>Coupon Name</label>
                            <input type="text" onChange={handleNameChange}  required/>
                        </div>
                       
                        <div class="mb-1">
                            <label for="couponTextarea" class="form-label">Coupon Description</label>
                            <textarea class="form-control " id="couponTextarea"  onChange={handleDescriptionChange} required></textarea>
                            <div class="invalid-feedback">
                                Please enter a description in the textarea.
                            </div>
                        </div>
                    </div> 
                    <div className="text-center">
                            <button className="nextBtn btn btn-primary" id="btnSave" onClick={next}>Next</button>
                             <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        }

        {
          formNo === 2 && <div>
            <div className="container">
         <header>General</header><br></br>
         <form  onSubmit={Submit}>
         <div className="form first">
         <div className="input-field">
                <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Coupon value(%)</label>
                             <input type="number" onChange={(e) => setValue(e.target.value)}/>
                         </div>
                         <div className="input-field">
                            <label>Starting Date</label>
                             <input type="date" placeholder="Enter starting date" onChange={handleStartDateChange}/>
                         </div>
                         <div className="input-field">
                             <label>Expiry Date</label>
                            <input type="date" placeholder="Enter ending date" onChange={handleEndDateChange}/>
                         </div>
                     </div> 
                     <div className="text-center">
                         <button className="backBtn btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="btn btn-primary" id="btnSave" onClick={finalSubmit}>create coupon</button> 
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                    </div>
                  </div>
                </div>
                {dateError && <p className="error-message">{dateError}</p>}
              </form>
            </div>   
          </div>
        }
      </div>
    );
}

export default CreateUser;