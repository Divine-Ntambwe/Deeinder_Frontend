import React from "react";
import Navbar from "../Navbar/Navbar";

const TermsAndConditions = () => {
  const styles = {
    page: {
      backgroundColor: "black",
      color: "gray",
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      margin: 0,
      display:"flex",
      flexDirection:"column"
    },
    header: {
      backgroundColor: "#4b0082",
      padding: "20px",
      textAlign: "center",
    },
    headerTitle: {
      color: "white",
      margin: 0,
      fontSize: "32px",
    },
    section: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      flex:"1"
    },
    title: {
      color: "#4b0082",
      marginBottom: "15px",
      textAlign: "center",
    },
    paragraph: {
      lineHeight: "1.6",
      fontSize: "15px",
      marginBottom: "15px",
    },
    list: {
      marginLeft: "20px",
      lineHeight: "1.6",
      fontSize: "15px",
    },
    footer: {
      backgroundColor: "#4b0082",
      textAlign: "center",
      padding: "15px",
      color: "white",
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.page}>
     <Navbar/>

      <section style={styles.section}>
        <h2 style={styles.title}>Terms and Conditions</h2>

        <p style={styles.paragraph}>
          By using Deeinder, you agree to follow these terms. Please read them carefully.
        </p>

        <ol style={styles.list}>
          <li>You must be at least 18 years old to use this platform.</li>
          <li>Do not use Deeinder for illegal or harmful activities.</li>
          <li>Your account may be removed if you break these rules.</li>
          <li>We may update these terms at any time.</li>
          <li>Continued use means you accept any changes.</li>
        </ol>

        
      </section>

      <footer style={styles.footer}>
        &copy; 2025 Deeinder. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsAndConditions;
