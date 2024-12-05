import styles from './style.module.scss';

export default function Deprecated() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Website Deprecated</h1>
        <p>
          We’re sorry, but this website is no longer available. 
          Thank you for your understanding.
        </p>
        <p>
          For more information, feel free to contact: <br />
          <a href="mailto:sauravshriwastavaa@gmail.com">sauravshriwastavaa@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
