import "../styles/Success.css";

function Success({ patientData }) {

    if (!patientData) return null;

    const { patient, token, qrCode } = patientData;

    return (

        <div className="success-card">

            <div className="success-header">

                <h2>Registration Successful</h2>

                <h1>{token}</h1>

            </div>

            <div className="success-details">

                <p>
                    <strong>Name:</strong> {patient.name}
                </p>

                <p>
                    <strong>Department:</strong> {patient.department}
                </p>

                <p>
                    <strong>Phone:</strong> {patient.phone}
                </p>

                <p>
                    <strong>Status:</strong> {patient.status}
                </p>

            </div>

            <div className="qr-container">

                <img
                    src={qrCode}
                    alt="QR Code"
                />

            </div>

            <button
                onClick={() => window.location.reload()}
            >
                Book Another Token
            </button>

        </div>

    );

}

export default Success;