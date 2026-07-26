import DepartmentCard from "../components/DepartmentCard";
import departments from "../data/departments";

import "../styles/Home.css";

function Home() {
    return (
        <div className="home">

            <h1>
                Smart Digital Hospital Token System
            </h1>

            <div className="department-container">

                {departments.map((department) => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
                    />
                ))}

            </div>

        </div>
    );
}

export default Home;