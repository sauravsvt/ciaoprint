import React from 'react';
import styles from './privacy-policy.module.scss'; // Import the styles as a module

const PrivacyPolicy = () => {
  return (
    <div className={styles['privacy-policy-container']}>
      <header className={styles.header}>
      <a href="https://ciaoprint.it">
  <img src="/logo.png" alt="Logo" className={styles.logo} />
</a>

        <h1>Privacy Policy</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.h2}>Introduction</h2>
        <p className={styles.p}>
          Ciao!Print ("we", "our", "us") respects your privacy and is committed to protecting your personal data in compliance with the European Union's General Data Protection Regulation (GDPR) and the Italian Data Protection Code (Legislative Decree No. 196/2003). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our services.
        </p>

        <h2 className={styles.h2}>Information We Collect</h2>
        <p className={styles.p}>
          We collect the following types of personal data when you use our website or services:
        </p>
        <ul className={styles.ul}>
          <li><strong>Personal Information:</strong> Name, phone number, email address, and delivery information.</li>
          <li><strong>Order Information:</strong> Documents you upload, order details, and preferences.</li>
        </ul>

        <h2 className={styles.h2}>How We Use Your Information</h2>
        <p className={styles.p}>
          Your personal data is used for the following purposes:
        </p>
        <ul className={styles.ul}>
          <li>To process and deliver your print orders.</li>
          <li>To communicate with you regarding your order status and any issues related to your service request.</li>
          <li>To improve our services and tailor our offerings to your preferences.</li>
        </ul>

        <h2 className={styles.h2}>Legal Basis for Processing Your Data</h2>
        <p className={styles.p}>
          We process your personal data based on the following legal grounds:
        </p>
        <ul className={styles.ul}>
          <li><strong>Contractual Necessity:</strong> We need your data to provide you with our printing and delivery services, as well as computer repair services.</li>
          <li><strong>Consent:</strong> We may request your consent for specific purposes, such as receiving updates or newsletters (which you can withdraw at any time).</li>
          <li><strong>Legal Obligation:</strong> We may process data if required to comply with legal obligations under Italian or EU law.</li>
        </ul>

        <h2 className={styles.h2}>Data Retention</h2>
        <p className={styles.p}>
          We will retain your personal information for as long as necessary to fulfill the purpose for which it was collected, including any legal, accounting, or reporting requirements. Once your order is complete and delivered, we will delete your data from our systems unless you request otherwise.
        </p>

        <h2 className={styles.h2}>Data Security</h2>
        <p className={styles.p}>
          We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, alteration, or destruction. These measures include encryption, secure servers, and limited access to your data.
        </p>

        <h2 className={styles.h2}>Your Rights Under GDPR</h2>
        <p className={styles.p}>
          Under the GDPR, you have the following rights regarding your personal data:
        </p>
        <ul className={styles.ul}>
          <li><strong>Right to Access:</strong> You can request information about the data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure (Right to be Forgotten):</strong> You can request the deletion of your data, and we will comply unless we have a legitimate reason to retain it.</li>
          <li><strong>Right to Restrict Processing:</strong> You can request the restriction of processing of your data under certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a commonly used electronic format.</li>
          <li><strong>Right to Object:</strong> You can object to the processing of your data in certain situations.</li>
        </ul>

        <h2 className={styles.h2}>Sharing Your Data</h2>
        <p className={styles.p}>
          We will not share your personal data with third parties, except in the following cases:
        </p>
        <ul className={styles.ul}>
          <li>To comply with legal obligations, such as responding to court orders or government requests.</li>
          <li>To service providers who assist us in operating our business, such as delivery services or IT support providers, under strict confidentiality agreements.</li>
        </ul>

        <h2 className={styles.h2}>Contact Us</h2>
        <p className={styles.p}>
          If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights under the GDPR, please contact us at <a className={styles.a} href="mailto:info@ciaoprint.it">info@ciaoprint.it</a> or call us at +39-3509719486.
        </p>

        <h2 className={styles.h2}>Changes to This Privacy Policy</h2>
        <p className={styles.p}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will take effect immediately upon posting.
        </p>
      </section>
        {/* FOOTER */}
      
        <footer className={styles.footer}>
        {/* copyright */}
      <p>
      Ciao! Print    &copy; All Rights Reserved
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy   </a>
        <a href="/about-us" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>About Us</a>
        <a href="/prices" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>Prices</a>
        </div>
    </footer>
    </div>
  );
};

export default PrivacyPolicy;
