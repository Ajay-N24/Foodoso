import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></Link>
        </div>
        <div style={{ marginInline: "550px", width: "100%" }} className="pb-2">
          <span className="text-muted">© 2023 Foodoso, Inc</span>
        </div>
      </footer>
    </div>
  );
}
