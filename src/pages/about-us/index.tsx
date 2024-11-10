import React from 'react';
import styles from './about-us.module.scss'; // Import the CSS module

const AboutUs = () => {
  return (
    <div className={styles['about-us-container']}>
      <header className={styles.header}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1>About Us</h1>
      </header>
      <section className={styles.content}>
        <h2 className={styles.h2}>Our Story</h2>
        <p className={styles.p}>
          Welcome to <strong>Ciao!Print</strong>, your go-to solution for fast, reliable, and professional document printing and computer repair services based in Italy. Founded with a mission to simplify and modernize the way you handle your essential documents, Ciao!Print prides itself on combining cutting-edge technology with a personalized customer experience.
        </p>

        <h2 className={styles.h2}>What We Do</h2>
        <p className={styles.p}>
          <strong>Printing and Next-Day Delivery</strong>: Our core service is a seamless online platform where customers can upload documents and have them printed and delivered to their doorsteps the very next day. Whether it’s personal paperwork, business documents, or special printing needs, we’ve got you covered. We guarantee complete confidentiality and data protection, deleting all files after delivery to ensure your peace of mind.
        </p>
        <p className={styles.p}>
          <strong>Computer Repair Services</strong>: Beyond printing, we are your trusted partner for technical support. Our team of skilled technicians is equipped to diagnose and resolve issues, remove viruses, install hardware and software, perform upgrades, and manage data backups—whether remotely or through on-site visits.
        </p>

        <h2 className={styles.h2}>Our Values</h2>
        <ul className={styles.ul}>
          <li><strong>Customer-Centric Approach</strong>: We prioritize your convenience and satisfaction, making sure every service is tailored to your needs.</li>
          <li><strong>Reliability and Quality</strong>: We maintain high standards, ensuring that your documents are printed with precision and your computer repairs are handled professionally.</li>
          <li><strong>Privacy and Data Security</strong>: Your trust is paramount. We adhere strictly to GDPR and Italian data protection regulations, ensuring your personal data is secure and never misused.</li>
          <li><strong>Innovation</strong>: We leverage the latest technology to offer an efficient, user-friendly experience, from a simple document upload to secure, speedy delivery.</li>
        </ul>

        <h2 className={styles.h2}>Why Choose Us?</h2>
        <ul className={styles.ul}>
          <li><strong>Fast Turnaround</strong>: Time is of the essence, so we make sure your documents are printed and delivered swiftly, without compromising on quality.</li>
          <li><strong>Transparent Pricing</strong>: Our competitive pricing structure is straightforward, so you know exactly what you’re paying for—no hidden fees.</li>
          <li><strong>Dedicated Support</strong>: Our customer service team is always ready to assist you with any inquiries or special requests.</li>
        </ul>

        <h2 className={styles.h2}>Our Vision</h2>
        <p className={styles.p}>
          To be the leading printing and tech support service in Italy, recognized for our dedication to quality, speed, and exceptional customer service. We strive to empower individuals and businesses by making essential services accessible and efficient.
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

export default AboutUs;
