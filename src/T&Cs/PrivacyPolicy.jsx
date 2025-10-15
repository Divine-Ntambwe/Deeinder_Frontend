import React from "react";
import Navbar from "../Navbar/Navbar";

const PrivacyPolicy = () => {
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
      flex:1
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
        <h2 style={styles.title}>Privacy Policy</h2>

        <p style={styles.paragraph}>
          At Deeinder, your privacy matters. This policy explains how we collect, use, and protect your information.
        </p>

        <h3 style={styles.title}>Information We Collect</h3>
        <ol style={styles.list}>
          <li>Basic account details (like name and email)</li>
          <li>Profile information you choose to share</li>
          <li>Usage data to improve the platform</li>
        </ol>

        <h3 style={styles.title}>How We Use Your Information</h3>
        <ol style={styles.list}>
          <li>To provide and improve our services</li>
          <li>To keep your account secure</li>
          <li>To show matches and suggestions</li>
        </ol>

        <h3 style={styles.title}>Your Control</h3>
        <p style={styles.paragraph}>
          You can edit or delete your information at any time in your account settings.  
          We do not sell your personal data.
        </p>

        <p style={styles.paragraph}>
          By using Deeinder, you agree to this privacy policy. We may update it from time to time.
        </p>
      </section>

      <footer style={styles.footer}>
        &copy; 2025 Deeinder. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
