import React from 'react';
import styles from './prices.module.scss'; // Import the styles module

const Prices = () => {
  return (
    <div className={styles.pricesContainer}>
      <header className={styles.header}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1>Our Prices</h1>
      </header>
      <section className={styles.pricesContent}>
        <div className={styles.priceItem}>
          <h2>Black and White Printing</h2>
          <p>€0.30 per A4 page</p>
        </div>
        <div className={styles.priceItem}>
          <h2>Color Printing</h2>
          <p>€0.80 per A4 page</p>
        </div>
        <div className={styles.priceItem}>
          <h2>A3 Printing</h2>
          <p>€1.50 per A3 page</p>
        </div>
        <div className={styles.priceItem}>
          <h2>A5 Printing</h2>
          <p>€0.20 per A5 page</p>
        </div>
        <div className={styles.priceItem}>
          <h2>Flyer Design</h2>
          <p>€100 for design (includes up to 2 revisions)</p>
        </div>
        <div className={styles.priceItem}>
          <h2>Computer Repair Services</h2>
          <ul>
            <li>Diagnostics: Free</li>
            <li>Virus Removal: €50</li>
            <li>Hardware Upgrades: Starting at €60</li>
            <li>Software Installation (Windows/Linux): €30</li>
            <li>Data Backup Services: €40</li>
          </ul>
        </div>
        <div className={styles.priceItem}>
          <h2>Other Printing Services</h2>
          <ul>
            <li>Posters (A0, A1, A2): Starting at €10</li>
            <li>Business Cards: €0.25 per card</li>
            <li>Photo Prints: €0.50 per photo</li>
            <li>Document Binding: €3 per document</li>
            <li>Envelopes Printing: €0.50 per envelope</li>
            <li>Custom Prints (T-shirts, Mugs): Prices vary</li>
          </ul>
        </div>
      </section>
      <section className={styles.contactUs}>
        <p>For more information or custom requests, please <a href="https://wa.me/+393509719486" target="_blank" rel="noopener noreferrer">Contact Us via WhatsApp</a>.</p>
      </section>

      <footer className={styles.footer}>
        {/* copyright */}
      <p>
      Ciao! Print    &copy; All Rights Reserved
      </p>

      {/* footer link */}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy   </a>
        <a href="/about-us" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>About Us</a>
        <a href="/prices" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>Prices</a>


        </div>


    </footer>
</div>
  );
};

export default Prices;
