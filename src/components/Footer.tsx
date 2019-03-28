import * as React from "react";
const { Tooltip } = require("react-tippy");
import "react-tippy/dist/tippy.css";

import "../style/Footer.css";

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <footer className="footer">
      <div className="links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/karrui/cap-calculator"
        >
          GitHub
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://jars.karrui.me"
        >
          🍯Jars
        </a>
      </div>
      <p>
        Built by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://karrui.me/">
          @karrui
        </a>
        , feel free to create PRs to make this prettier/ update the logic!
      </p>
      <Tooltip
        // options
        interactive={true}
        hideOnClick={false}
        size="small"
        title="Send me an email at karrui.lau@gmail.com if your module cannot be found!"
        position="top"
      >
        <p>Data updated on 28 March 2019.</p>
      </Tooltip>
    </footer>
  );
};

export default Footer;
