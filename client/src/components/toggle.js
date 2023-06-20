import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Toggelable = forwardRef((props, ref) => {
  const [visible, SetVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const changeVisible = () => {
    SetVisible(!visible);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        changeVisible,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="danger" onClick={changeVisible}>
          cancel
        </Button>
      </div>

      <div style={hideWhenVisible}>
        <Button variant="success" onClick={changeVisible}>
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  );
});
Toggelable.displayName = "Togglable";
Toggelable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Toggelable;
