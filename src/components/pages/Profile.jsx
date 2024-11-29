import axios from "axios";
import "../../styles/profile.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const check = localStorage.getItem("userId");
  const [data1, setData1] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [apartment, setApartment] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const result = await axios.get(
        `http://localhost:8000/getUserData/${check}`
      );
      console.log(result);
      setData1(result.data.result);
      setName(result.data.result.name || "");
      setSurname(result.data.result.surname || "");
      setMobile(result.data.result.mobile || "");
      setDob(result.data.result.dob || "");
      setEmail(result.data.result.email || "");
      setRoom(result.data.result.roomno || "");
      setApartment(result.data.result.building || "");
      setArea(result.data.result.area || "");
      setCity(result.data.result.city || "");
      setState(result.data.result.state || "");
      setPincode(result.data.result.pincode || "");
      setCountry(result.data.result.country || "");
      setBank(result.data.result.bank || "");
      setAccount(result.data.result.ac || "");
      setIfsc(result.data.result.ifsc || "");
      setImageURL(result.data.result.imageURL || "");
    };
    checkUser();
  }, [check]);

  const handleProfileForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", data1._id);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("mobile", mobile);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("room", room);
    formData.append("apartment", apartment);
    formData.append("area", area);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("country", country);
    formData.append("bank", bank);
    formData.append("account", account);
    formData.append("ifsc", ifsc);

    const result = await axios.post(
      "http://localhost:8000/upload-userdetail",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(result);
    if (result.data.success) {
      toast.success("User detail updated");
      window.location.href = "/";
    }
  };

  const handleUserPicForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", data1._id);
    formData.append("userpic", image);

    const result = await axios.post(
      "http://localhost:8000/upload-userpic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result);
    if (result.data.success) {
      toast.success("User Pic updated");
      // window.location.href = "/";
    }
  };

  return (
    <main className="profile-main container d-flex flex-column py-3 px-4">
      {data1 && (
        <>
          <motion.h1
            className="anton"
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1 }}
          >
            WELCOME {data1.name}
          </motion.h1>

          <section className="profile-details d-flex">
            <form className="w-75" onSubmit={handleProfileForm}>
              {/* //left bar */}

              <div className="profile-right w-100 d-flex flex-column justify-content-start align-items-start p-3">
                <section className="w-100 d-flex justify-content-start align-items-center gap-3">
                  <div className="w-50">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="surname" className="form-label">
                      Surname
                    </label>
                    <br />
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Enter surname"
                      className="form-control"
                    />
                  </div>
                </section>
                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-3">
                  <div className="w-50">
                    <label htmlFor="mobile" className="form-label">
                      Mobile No
                    </label>
                    <br />
                    <input
                      type="Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="dob" className="form-label">
                      DOB
                    </label>
                    <br />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </section>
                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-3">
                  <div className="w-100">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <br />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      className="form-control"
                    />
                  </div>
                </section>

                <h5 className="varela poppins mt-5 fw-bold">Address Details</h5>
                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-1">
                  <div className="w-50">
                    <label htmlFor="room" className="form-label">
                      Room no
                    </label>
                    <br />
                    <input
                      type="number"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="Enter Room number"
                      className="form-control"
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="building" className="form-label">
                      Apartment
                    </label>
                    <br />
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Enter Apartment name "
                      className="form-control"
                    />
                  </div>
                </section>

                <section className="w-100 d-flex justify-content-between align-items-center gap-3 mt-3">
                  <div className="w-25">
                    <label htmlFor="area" className="form-label">
                      Area
                    </label>
                    <br />
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Enter Area name"
                      className="form-control"
                    />
                  </div>
                  <div className="w-25">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <br />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter City name "
                      className="form-control"
                    />
                  </div>
                  <div className="w-25">
                    <label htmlFor="State" className="form-label">
                      State
                    </label>
                    <br />
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter State name "
                      className="form-control"
                    />
                  </div>
                </section>

                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-3">
                  <div className="w-50">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <br />
                    <input
                      type="number"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode"
                      className="form-control"
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <br />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Enter Country "
                      className="form-control"
                    />
                  </div>
                </section>

                <h5 className="varela poppins mt-5  fw-bold">Bank Details</h5>
                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-1">
                  <div className="w-100">
                    <label htmlFor="bank" className="form-label">
                      Bank Name
                    </label>
                    <br />
                    <input
                      type="text"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      placeholder="Enter Bank name"
                      className="form-control"
                    />
                  </div>
                </section>

                <section className="w-100 d-flex justify-content-start align-items-center gap-3 mt-3">
                  <div className="w-50">
                    <label htmlFor="account" className="form-label">
                      Account no
                    </label>
                    <br />
                    <input
                      type="number"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      placeholder="Enter Account number"
                      className="form-control"
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="ifsc" className="form-label">
                      IFSC code
                    </label>
                    <br />
                    <input
                      type="text"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                      placeholder="Enter IFSC code "
                      className="form-control"
                    />
                  </div>
                </section>
                <button className="btn btn-primary mt-2" type="submit">
                  Save
                </button>
              </div>
            </form>
            {/* //right bar */}

            <form
              className="profile-left p-3 d-flex flex-column justify-content-start align-items-center"
              onSubmit={handleUserPicForm}
            >
              <section className="user-img mt-3 d-flex justify-content-center align-items-center">
                <img src={imageURL} alt="userpic" />
              </section>
              <input
                name="userpic"
                type="file"
                accept="image/*"
                className="border w-100 mt-2"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button className="btn btn-primary mt-2">Upload</button>
            </form>
          </section>
        </>
      )}
    </main>
  );
};

export default Profile;
