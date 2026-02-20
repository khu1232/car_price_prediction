import React, { useState } from "react";
import "./Form.css";
const Form = () => {
  // State to manage loading state
  const [isLoading, setIsloading] = useState(false);
  // State to manage form data
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Fuel_Type: "",
    Seller_Type: "",
    Transmission: "",
    Owner: "",
  });
  // State to manage prediction result
  const [result, setResult] = useState("");
  // State to manage displaying result
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  // Function to handle the 'Predict Selling Price' button click
  const handlePredictClick = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/predict";
    setIsloading(true);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
  console.log("API Response:", response);

  if (response.Prediction) {
    setResult(response.Prediction[0]);
  } else {
    console.error("Backend Error:", response.error);
    alert(response.error);
  }

  setIsloading(false);
  setShowSpan(true);
});

  };

  return (
    <>
      <div className="container text-center mt-4">
        <h1 className="text-center">Car Price Prediction</h1>
        <div className="container1">
          <form method="post" acceptCharset="utf-8" name="Modelform">
            <div className="form-group text-center mt-3">
              <label>
                <b>Enter Year of Purchase:</b>
              </label>
              
              <input
                type="text"
                className="form-control"
                id="Year"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                placeholder="Enter Year of Purchase "
              />
            </div>
            <div className="form-group">
              <label>
                <b>Enter Present Price(in Lakhs):</b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="Present_Price"
                name="Present_Price"
                value={formData.Present_Price}
                onChange={handleChange}
                placeholder="Enter Present Price(in Lakhs)"
              />
            </div>
            <div className="form-group">
              <label>
                <b>
                  Enter the Number of KM car travelled:
                </b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="Kms_Driven"
                name="Kms_Driven"
                value={formData.Kms_Driven}
                onChange={handleChange}
                placeholder="Enter the kilometres driven "
              />
            </div>
            <div className="form-group">
              <label>
                <b>Select the Fuel Type:</b>
              </label>
              <br />
              <select
                className="selectpicker form-control"
                id="Fuel_Type"
                name="Fuel_Type"
                value={formData.Fuel_Type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="0">Petrol</option>
                <option value="1">Diesel</option>
                <option value="2">CNG</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <b>Select the Seller Type:</b>
              </label>
              <br />
              <select
                className="selectpicker form-control"
                id="Seller_Type"
                name="Seller_Type"
                value={formData.Seller_Type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="0">Dealer</option>
                <option value="1">Individual</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <b>Select the Transmission Type:</b>
              </label>
              <br />
              <select
                className="selectpicker form-control"
                id="Transmission"
                name="Transmission"
                value={formData.Transmission}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="0">Manual</option>
                <option value="1">Automatic</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <b>Enter the Number of Owners:</b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="Owner"
                name="Owner"
                value={formData.Owner}
                onChange={handleChange}
                placeholder="Enter the number of Owner "
              />
            </div>
            <div className="form-group">
              <button
                className="btn form-control"
                disabled={isLoading}
                onClick={!isLoading ? handlePredictClick : null}
              >
                Predict Selling Price
              </button>
            </div>
          </form>
          <br />
          <div className="text-center">
            <h4>
              {showSpan && (
                <span id="prediction">
                  {result ? (
  <p>The Predicted Price is {result} Lakhs</p>
) : (
  <p>Please fill out each field in the form completely</p>
)}
                </span>
              )}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;