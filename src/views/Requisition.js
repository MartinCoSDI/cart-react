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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, vendor, address }),
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

        }
    }

  return (
    <div className="report">
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
        <button type="submit"
                  onClick={handleOnSubmit}>submit</button>
      </form>
    </div>
  );
}

export default App;

//this requisition has been adjusted for a test 
//removed some function from it, there is already another txt file that saved all the need information to it

