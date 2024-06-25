import React from "react";
import "./footer.modules.css";
import {
  RocketLaunchOutlined,
  CatchingPokemonOutlined,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <div className='footerDiv'>
        <p>
          Web page created by{" "}
          <a target='_blank' href='https://www.linkedin.com/in/darkdiego/'>
            Diego Iglesias
          </a>
        </p>
        <RocketLaunchOutlined sx={{ color: "green" }} />
      </div>
      <div className='footerDiv'>
        <CatchingPokemonOutlined sx={{ color: "red" }} />
        <p className='footerDivSecondP'>All right reserved - 2024</p>
        <CatchingPokemonOutlined sx={{ color: "red" }} />
      </div>
    </footer>
  );
};

export default Footer;
