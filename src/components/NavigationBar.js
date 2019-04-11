import React from "react";

const NavigationBar = () => {
  return (
    <nav className="timecoach-header">
      <div className="row wrap">
        <div className="col-sm-6 logo-container">
          <a href="./" className="site-title">
            <span className="clockIcon" />Time Coach
          </a>
        </div>
        <div className="nav col-sm-6">
          {/* <Link to="app" className="menu-item -white">Estimate</Link>
					<Link to="authors" className="menu-item -white">Activities</Link>
					<Link to="about" className="menu-item -white">Results</Link> */}
          <a href="/estimates" className="menu-item -white">
            Estimate
          </a>
          <a href="/activities" className="menu-item -white">
            Activity
          </a>
          <a href="/results" className="menu-item -white">
            Results
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
