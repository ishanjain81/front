import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Home() {
    const [slot, setSlot] = useState('');
    const [month,setMonth] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [age,setAge] = useState('');
    const [error,setError] = useState('');

    // set timing slot
    const handleSlotChange = (event) => {
        setSlot(event.target.value);
    };

    // set month
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    // handle age
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    // handle payment
    const handlePayment = () => {
        if(firstName === '' || lastName === '' || slot === '' || month === ''
            || age === ''
        ){
            setError('Please fill all required details!');
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        if(age < 18 || age > 65){
            setError('Age should be between 18 and 65!');
            setTimeout(()=>{
                setError('')
            },2000);
            setAge('');
            return;
        }
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                age: age,
                timeSlot: slot,
                month: month,
                amount: 500
            })
        };

        fetch("/payment", requestOptions)
        .then(response => response.json())
        .then(data => {
            toast.success(data.message);
            console.log(data);
        });

        setSlot('');
        setAge('');
        setMonth('');
        setFirstName('');
        setLastName('');
    }

  return (
    <div className="home-page">
        <div className="container">
        <h1 className="heading">Yoda Admission Form</h1>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        {
            error !== ''?<Alert severity="error" sx={{m: 1, width: 300}}>{error}</Alert>: <></>
        }
        </div>
        <div>
            <TextField className="input" id="outlined-error-helper-text" label="First Name" margin='normal' required value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
            <TextField className="input" id="outlined-error-helper-text" label="Last Name" margin='normal' required value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
            <TextField className="input" id="outlined-error-helper-text" label="Age" type="number" margin='normal' required value={age} onChange={(e)=>handleAgeChange(e)}/>
        </div>
        <div>
        <FormControl sx={{m: 1, minWidth: 220}}>
            <InputLabel className="input" id="demo-simple-select-label" required>Time Slot</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={slot}
                label="Time Slot"
                onChange={handleSlotChange}
                className="input"
            >
                <MenuItem value={"6-7 AM"}>6-7 AM</MenuItem>
                <MenuItem value={"7-8 AM"}>7-8 AM</MenuItem>
                <MenuItem value={"8-9 AM"}>8-9 AM</MenuItem>
                <MenuItem value={"5-6 PM"}>5-6 PM</MenuItem>
            </Select>
        </FormControl>
        </div>
        <div>
        <FormControl sx={{m: 1, minWidth: 220}}>
            <InputLabel className="input" id="demo-simple-select-label" required>Month</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Time Slot"
                onChange={handleMonthChange}
                className="input"
            >
                <MenuItem value={"January"}>January</MenuItem>
                <MenuItem value={"February"}>February</MenuItem>
                <MenuItem value={"March"}>March</MenuItem>
                <MenuItem value={"April"}>April</MenuItem>
                <MenuItem value={"May"}>May</MenuItem>
                <MenuItem value={"June"}>June</MenuItem>
                <MenuItem value={"July"}>July</MenuItem>
                <MenuItem value={"August"}>August</MenuItem>
                <MenuItem value={"September"}>September</MenuItem>
                <MenuItem value={"October"}>October</MenuItem>
                <MenuItem value={"November"}>November</MenuItem>
                <MenuItem value={"December"}>December</MenuItem>
            </Select>
        </FormControl>
        </div>
        <div>
            <TextField className="input" disabled id="outlined-disabled" label="Amount (Rs.)" defaultValue={500} margin='normal' required/>
        </div>
        <div><Button variant="contained" onClick={handlePayment}>Make Payment</Button></div>
        <div><ToastContainer/></div>
        </div>
    </div>
  )
}

export default Home