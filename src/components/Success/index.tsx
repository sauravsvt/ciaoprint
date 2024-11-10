import style from "./style.module.scss";

interface SuccessProps {
  resendHandler: () => void;
}
const Success = ({ resendHandler }: SuccessProps) => {
  return (
    <main className={style.successContainer}>
      <div className={style.successMessage}>Successfully Sent</div>
      <p className={style.successInfo}>
        We will get in touch with you within half an hour
      </p>
      <p className={style.successVisit}>Visit us Again</p>
      <button
        onClick={() => {
          resendHandler();
        }}
        className={style.resendButton}
      >
        Resend
      </button>
    </main>
  );
};

export default Success;
