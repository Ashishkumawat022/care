import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../websitestyle.css";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

// function getLocation() {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(showPosition);
// 	} else {
// 		// x.innerHTML="Geolocation is not supported by this browser.";
// 	}
// }

// function showPosition(position) {
// 	var lat = position.coords.latitude;
// 	var lon = position.coords.longitude;
// 	displayLocation(lat,lon);
// 	console.log(lat, lon);
// }

// function displayLocation(latitude,longitude){
//     var geocoder;
//     geocoder = new google.maps.Geocoder();
//     var latent = new google.maps.LatLng(latitude, longitude);

//     geocoder.geocoder(
//         {'latLng': latent},
//         function(results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 if (results[0]) {
//                     var add= results[0].formatted_address ;
//                     var  value=add.split(",");

//                    var count=value.length;
//                    var country=value[count-1];
//                     // state=value[count-2];
//                     // city=value[count-3];
//                     // x.innerHTML = "city name is: " + city;
// 					console.log(country);
//                 }
//                 else  {
//                     // x.innerHTML = "address not found";
//                 }
//             }
//             else {
//                 // x.innerHTML = "Geocoder failed due to: " + status;
//             }
//         }
//     );
// }

// function getdata(){

// 	var config = {
// 		method: 'get',
// 		url: 'https://ip.nf/me.json',
// 		headers: {
// 		  'Content-Type': 'application/json'
// 		},
// 		data : data
// 	  };

// 	  axios(config)
// 	  .then(function (response) {
// 		console.log(response);
// 	  })
// 	  .catch(function (error) {
// 		console.log(error);
// 	  });

// }

function Header() {
  // const URL = "https://ip.nf/me.json";
  const [info, setInfo] = useState({ ip: "" });
  const [image, setimage] = useState("");

  // 	useEffect(() => {

  // 		axios(URL, { method: "get" })
  // 			.then((response) => response.json())
  // 			.then((data) => {
  // 				setInfo({ ...data });
  // 			});

  // 	}, []);
  useEffect(() => {
    getdata();
  }, []);
  function getdata() {
    var config = {
      method: "get",
      url: "https://ip.nf/me.json",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        if (response.data.ip.country === "United States") {
          setInfo(response.data);
          setimage(`${process.env.PUBLIC_URL}/images/us_flag.svg`);
        } else if (response.data.ip.country === "United Kingdom") {
          setInfo(response.data);
          setimage(`${process.env.PUBLIC_URL}/images/r1.svg`);
        } else {
          setimage(`${process.env.PUBLIC_URL}/images/india_flag.svg`);
          setInfo(response.data);
        }
        console.log(response.data.ip.country);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function login() {
    window.location.href =
      "http://caremagnusbundled.s3-website.eu-west-2.amazonaws.com/admin/login";
  }
  // function register() {
  //   window.location.href =
  //     "http://caremagnusbundled.s3-website.eu-west-2.amazonaws.com/admin/signup";
  // }
  return (
    <header className="main_header header_fix">
      <div className="websitetopbar">
        <div className="container">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <ul className="topbar_list">
                <li>Region : </li>
                <li>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img id="RegionFlag" alt="" src={image} />{" "}
                      <span id="RegionName">{info.ip.country}</span>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li
                        data-name="United States"
                        data-img={`${process.env.PUBLIC_URL}/images/r1.svg`}
                      >
                        <img
                          alt=""
                          src={`${process.env.PUBLIC_URL}/images/us_flag.svg`}
                        />{" "}
                        United States{" "}
                      </li>
                      <li
                        data-name="United Kingdom"
                        data-img={`${process.env.PUBLIC_URL}/images/r1.svg`}
                      >
                        <img
                          alt=""
                          src={`${process.env.PUBLIC_URL}/images/r1.svg`}
                        />{" "}
                        United Kingdom
                      </li>
                      <li
                        data-name="India"
                        data-img={`${process.env.PUBLIC_URL}/images/india_flag.svg`}
                      >
                        <img
                          alt=""
                          src={`${process.env.PUBLIC_URL}/images/india_flag.svg`}
                        />{" "}
                        India
                      </li>
                      {/* <li data-name="United Kingdom 2" data-img={`${process.env.PUBLIC_URL}/images/r1.svg`}><img alt="" src={`${process.env.PUBLIC_URL}/images/r1.svg`} /> United Kingdom 2</li>
											<li data-name="United Kingdom 3" data-img={`${process.env.PUBLIC_URL}/images/r2.svg`}><img alt="" src={`${process.env.PUBLIC_URL}/images/r2.svg`} /> United Kingdom 3</li>
											<li data-name="United Kingdom 4" data-img={`${process.env.PUBLIC_URL}/images/r2.svg`}><img alt="" src={`${process.env.PUBLIC_URL}/images/r2.svg`} /> United Kingdom 4</li>
											<li data-name="United Kingdom 5" data-img={`${process.env.PUBLIC_URL}/images/r1.svg`}><img alt="" src={`${process.env.PUBLIC_URL}/images/r1.svg`} /> United Kingdom 5</li>
											<li data-name="United Kingdom 6" data-img={`${process.env.PUBLIC_URL}/images/r2.svg`}><img alt="" src={`${process.env.PUBLIC_URL}/images/r2.svg`} /> United Kingdom 6</li> */}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg ak_menu">
        <div className="mobile_topbar"></div>
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img alt="" src={`${process.env.PUBLIC_URL}/images/logo.svg`} />
          </NavLink>
          <button className="navbar-toggler mobile_menu">
            <GiHamburgerMenu />
          </button>
          <div className="collapse navbar-collapse">
            <div className="menu_box">
              <div className="mobile_logo">
                <NavLink to="" className="mobile_close">
                  ×
                </NavLink>
              </div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/segments" className="nav-link">
                    Segments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/features" className="nav-link">
                    Features
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/plans" className="nav-link">
                    Plans
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link">
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/blog" className="nav-link">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item login_signup">
                  <Link onClick={login} className="nav-link">
                    Log-In
                  </Link>{" "}
                  {/* <span>/</span>
                  <Link onClick={register} className="nav-link">
                    Register
                  </Link> */}
                </li>
              </ul>
            </div>

            <div className="hide_box mobile_close"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
