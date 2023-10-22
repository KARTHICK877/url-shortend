import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import Topbar from "../Components/Topbar";

function EnterURL() {
  const [data1, setData] = useState([]);
  let getData = async () => {
    try {
      let res = await axios.get(`${config.api}/enterurl`, {
        headers: {
          Authorization: `${localStorage.getItem("login_credential")}`,
        },
      });
      setData(res.data);
      console.log(res.data);
      console.log(data1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      longURL: "",
      count: 0,
    },
    onSubmit: async (values) => {
      const data = await axios.post(`${config.api}/enterurl`, values, {
        headers: {
          Authorization: `${localStorage.getItem("login_credential")}`,
        },
      });
      alert(data.data.message);
      getData();
    },
  });
  let doLogout = () => {
    localStorage.removeItem("login_credential");
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Topbar />
          <main className="col-lg-8 col-md-6 col-sm-4 mx-auto">
            <div className="pt-3 pb-2 mb-4 border-bottom">
              <h1 className="text-center text-primary p-1 border border-primary bg-light mx-auto rounded">
                Paste the URL to be shortened
              </h1>
            </div>
            <br />
            <form onSubmit={formik.handleSubmit}>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Long URL"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  name="longURL"
                  onChange={formik.handleChange}
                  value={formik.values.longURL}
                />
                <button
                  className="btn btn-dark fw-bold"
                  type="submit"
                  id="button-addon2"
                >
                  CLICK ME
                </button>
              </div>
            </form>

            <div className="row">
              {data1.map((item) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-8" key={item.id}>
                    <div className="card text-bg-light mb-3 m-5">
                      <div className="card-header">Click Count: {item.count}</div>
                      <div className="card-body">
                        <h5 className="card-title">
                          <a href={item.shortURL} target="_blank">
                            {item.shortURL}
                          </a>
                        </h5>
                        <p className="card-text">{item.longURL}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default EnterURL;
