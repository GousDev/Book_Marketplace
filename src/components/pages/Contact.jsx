import "../../styles/contact.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  return (
    <div className="contact">
      <div className="map-container ">
        <MapContainer
          center={[19.419863, 72.811661]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className="contact-detail container p-4">
        <h5 className="inc-sans">Website Orders</h5>
        <div className="contact-detail-box1 d-flex flex-wrap justify-content-start align-items-center gap-3 pt-3 pb-2">
          <div className="contact-detail-items d-flex justify-content-start align-items-center gap-2">
            <span>
              <PhoneAndroidIcon className="phone-icon fs-2" />
            </span>
            <span>
              <h5>Call us on</h5>
              <a href={`tel:8928065925`} className="text-decoration-none">
                +91 8928065925
              </a>
            </span>
          </div>

          <div className="contact-detail-items d-flex justify-content-start align-items-center gap-2">
            <span>
              <EmailIcon className="mail-icon fs-2" />
            </span>
            <span>
              <h5>Mail us on</h5>
              <a
                href={`mailto:gousm55@gmail.com`}
                className="text-decoration-none"
              >
                gousm55@gmail.com
              </a>
            </span>
          </div>
        </div>
        <div className="contact-detail-box2"></div>
      </div>
    </div>
  );
};

export default Contact;
