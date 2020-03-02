import React from 'react';

const Footer = props => {
  return (
    <div>
      <div className="footer sticky-bottom bg-dark" style={{ padding: '1rem' }}>
        <div className="row text-center">
          <div className="col-md-3 text-white lead">
            <p>
              <a
                href="https://github.com/iamsomraj/"
                target="blank"
                className="text-white"
              >
                Somraj Mukherjee
              </a>
            </p>
          </div>
          <div className="col-md-3 text-white lead">
            <p>&copy;</p>
          </div>
          <div className="col-md-3 text-white lead">
            <p>{new Date().getFullYear()}</p>
          </div>
          <div className="col-md-3 text-white lead">
            <p> All Rights are Reserved </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
