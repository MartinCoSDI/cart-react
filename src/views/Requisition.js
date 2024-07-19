import { useState } from "react";
//import "./App.css";
import './Requisition.css'
function App() {
  const [partList, setServiceList] = useState([{part: "", quantity: "", description: "" }]);
  //const [quantityList, setQuantityList] = useState([{ quantity: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...partList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleQuantityChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...partList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleDescription = (e, index) => {
    const { name, value } = e.target;
    const list = [...partList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...partList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    console.log(typeof(partList))
    setServiceList([...partList, { part: "" , quantity:"", description: ""}]);
  };


  const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
    
  const [vendor, setVendor] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [expected_date, setExpectedDate] = useState(new Date());

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, vendor, address, date, expected_date, partList }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            //setEmail("");
            setName("");
            setVendor("");
            setAddress("");
            setDate(new Date());
            setExpectedDate(new Date());
            setServiceList([{ part: "", quantity: "", description: "" }])

        }
    }

  return (
    <form className="App" autoComplete="off">
                <p>Name</p>
                <input type="text" placeholder="name"
                value={name} onChange={(e) => setName(e.target.value)} />
                <p>Vendor</p>
                <input type="text" placeholder="vendor"
                value={vendor} onChange={(e) => setVendor(e.target.value)} />
                <p>Address</p>
                <input type="text" placeholder="address"
                value={address} onChange={(e) => setAddress(e.target.value)} />
                <p>Order Date</p>
                <input type="date" id="date" name="trip-start" value={date} onChange={(e) => setDate(e.target.value)}/>
                <p>Required Date</p>
                <input type="date" id="expected_date" name="trip-start" value={expected_date} onChange={(e) => setExpectedDate(e.target.value)}/>

      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {partList.map((singlePart, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <p>Part</p>
              <input
                name="part"
                type="text"
                id="part"
                value={singlePart.part}
                onChange={(e) => handleServiceChange(e, index)}
                
              />
              <p>Quantity</p>
              <input
                name="quantity"
                type="text"
                id="quantity"
                value={singlePart.quantity}
                placeholder="quantity"
                onChange={(e) => handleQuantityChange(e, index)}
                
              />
              <p>Description</p>
              <input
                name="description"
                type="text"
                id="description"
                value={singlePart.description}
                placeholder="description"
                onChange={(e) => handleDescription(e, index)}
                
              />
              <br></br>
              
              {partList.length - 1 === index && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {partList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button type="submit"
                onClick={handleOnSubmit}>submit</button>
    </form>
  );
}

export default App;