import React from "react";
import style from "./style.module.scss";

interface SuccessProps {
  ticketId: string; // ticketId should be a string
  resendHandler: () => void;
}

const Success: React.FC<SuccessProps> = ({ ticketId, resendHandler }) => {
  return (
    <div className={style.successContainer}>
      <h2 className={style.heading}>Submission Successful!</h2>
      <p>Your ticket ID is: <strong className={style.ticketId}>{ticketId}</strong></p>
      <p>
        For customized references, please contact us at{" "}
        <a href="mailto:info@ciaoprint.it" className={style.contactLink}>
          info@ciaoprint.it
        </a>.
      </p>
      <button onClick={resendHandler} className={style.resendButton}>
        Resend
      </button>
    </div>
  );
};

export default Success;
