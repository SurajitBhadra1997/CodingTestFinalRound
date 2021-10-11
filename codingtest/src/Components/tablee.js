import React, { useState, useEffect } from "react";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import moment from "moment";
import { Row, Col, MDBDataTable } from "mdbreact";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
// import DatePicker from "react-date-picker";
function Table() {
  useEffect(() => {
    getdata();
  }, []);
  const [date, setdate] = useState("");

  const [data, setdata] = useState([]);

  const [dataa, setdataa] = useState([]);

  const [age, setage] = useState("");

  const getdata = async () => {
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
      "https://recengine.intoday.in/recengine/at/getarticles"
    );

    // fetch(
    //   "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date="
    // )
    //   .then((res) => res.json())
    //   .then((json) => setdata(json));

    let datat = [];

    let i = 1;

    console.log("response", response.data.data);

    setdata(response.data.data);

    console.log("data", data);

    response.data.data.forEach((element, index) => {
      let rows = {
        sl: i,
        name: element.title,
        image: <img src={element.mobile_image} width="50" height="50" />,
      };
      i++;
      datat.push(rows);
    });

    setdataa(datat);
    // console.log("data", data);
  };

  const dataaaa = {
    columns: [
      {
        label: "Title",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Image",
        field: "image",
        sort: "asc",
        width: 270,
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
      {/* <MDBDataTable striped bordered hover data={dataaaa} /> */}
      {/* {data} */}
      <Row>
        {/* {data.map((item, index) => {
          return (
            <Col xs={6}>
              <Card
                style={{
                  width: 400,
                  backgroundColor: "yellow",
                }}
              >
                <CardContent>
                  <Typography
                    style={{ fontSize: 14 }}
                    color="textSecondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <img src={item.mobile_image} width="50" height="50" />
                </CardContent>
              </Card>
            </Col>
          );
        })} */}
        {data.map((item, index) => {
          return (
            <Col xs={6}>
              <div className="card" style={{ width: "18rem" }}>
                <img src={item.mobile_image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">News title</h5>
                  <p className="card-text">
                    {item.title}
                  </p>
                  {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Table;
