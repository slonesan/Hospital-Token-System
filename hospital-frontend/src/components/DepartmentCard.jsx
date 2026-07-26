import "../styles/DepartmentCard.css";
function DepartmentCard({ department, onSelect }) {

    return (

        <div
            className="department-card"
            onClick={() => onSelect(department.name)}
        >

            <div className="department-icon">
                {department.icon}
            </div>

            <h3>
                {department.name}
            </h3>

            <p>
                Tap to Continue
            </p>

        </div>

    );

}

export default DepartmentCard;