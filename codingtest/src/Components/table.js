import React, { useState, useEffect } from "react";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

// import DatePicker from "react-date-picker";
function Table() {
  const [date, setdate] = useState("");

  const [data, setdata] = useState([]);

  const [dataa, setdataa] = useState([]);

  const [age, setage] = useState("");

  const submit = async () => {
    let arr = date.split("-");

    let newdate = arr[2] + "" + arr[1] + "" + arr[0];
    // var requestOptions = {
    //   method: "GET",

    //   redirect: "follow",
    // };

    // let result = await fetch(
    //   "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date=" +
    //     newdate,
    //   requestOptions
    // ).then((response) => response.json());
    const response = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date=" +
        newdate
    );

    fetch(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date=" +
        newdate
    )
      .then((res) => res.json())
      .then((json) => setdata(json));

    let datat = [];

    let i = 1;

    // console.log("response", response);

    setdata(response.data.sessions);

    console.log("data", data);

    data.forEach((element, index) => {
      let rows = {
        sl: i,
        name: element.name,
        address: element.address,
        feetype: element.fee_type,
        totalcap: element.available_capacity,
        dose1: element.available_capacity_dose1,
        dose2: element.available_capacity_dose2,
        charges: element.fee,
        min_age_limit: element.min_age_limit,
        vaccine: element.vaccine,
      };
      i++;
      datat.push(rows);
    });

    setdataa(datat);
    // console.log("data", data);
  };

  const handlechange = (event) => {
    setage(event.target.value);
    // console.log(event.target.value);
    let arr = data.filter((item) => item.min_age_limit == event.target.value);

    setdata(arr);
    console.log(arr);
  };
  const dataaaa = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 270,
      },
      {
        label: "Fee Type",
        field: "feetype",
        sort: "asc",
        width: 200,
      },
      {
        label: "Total Capacity",
        field: "totalcap",
        sort: "asc",
        width: 100,
      },
      {
        label: "Dose 1 Capacity",
        field: "dose1",
        sort: "asc",
        width: 150,
      },
      {
        label: "Dose 2 Capacity",
        field: "dose2",
        sort: "asc",
        width: 100,
      },
      {
        label: "Charges",
        field: "charges",
        sort: "asc",
        width: 100,
      },
      {
        label: "Minimum Age Limit",
        field: "min_age_limit",
        sort: "asc",
        width: 100,
      },
      {
        label: "Vaccine",
        field: "vaccine",
        sort: "asc",
        width: 100,
      },
    ],
    rows: dataa,
  };
  const [value, setvalue] = useState();

  const onChange = () => {
    setvalue(new Date());
    console.log(value);
  };
  return (
    <div>
      {/* <table>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Fee Type</th>
          <th>Total Capacity</th>
          <th>Dose 1 Capacity</th>
          <th>Dose 2 Capacity</th>
          <th>Charges</th>
          <th>Minimum Age</th>
          <th>Vaccine Name</th>
        </tr>
        <tr>
          {data.map((item, index) => {
            return <td key={index}>{item.name}</td>;
          })}
        </tr>
      </table> */}
      <MDBDataTable striped bordered hover data={dataaaa} />
      <input
        type="date"
        value={date}
        onChange={(val) => setdate(val.target.value)}
      />
      {/* <DatePicker onChange={onChange} value={value} /> */}
      <button type="button" onClick={submit}>
        Submit
      </button>
      18+
      <input
        type="radio"
        value="18"
        onChange={handlechange}
        checked={age === "18"}
      />
      45+
      <input
        type="radio"
        value="45"
        onChange={handlechange}
        checked={age === "45"}
      />
    </div>
  );
}

export default Table;
