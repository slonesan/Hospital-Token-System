import { useNavigate } from "react-router-dom";

function DepartmentCard({ department }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/patient", {
            state: {
                department: department.name,
            },
        });
    };

    return (
        <div className="department-card" onClick={handleClick}>
            <div className="department-icon">
                {department.icon}
            </div>

            <h3>{department.name}</h3>
        </div>
    );
}

export default DepartmentCard;