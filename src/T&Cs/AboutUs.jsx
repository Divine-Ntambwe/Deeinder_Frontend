import { display, flexDirection, minHeight } from "@mui/system";
import React from "react";
import Navbar from "../Navbar/Navbar";

const AboutUs = () => {
  const styles = {
    page: {
      backgroundColor: "black",
      color: "gray",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      minHeight: "100vh",
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
      textAlign: "center",
      flex:"1"
    },
    sectionTitle: {
      color: "#4b0082",
      marginBottom: "10px",
    },
    paragraph: {
      lineHeight: "1.6",
      fontSize: "16px",
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
      {/* <header style={styles.header}> */}
        <Navbar/>
        {/* <h1 style={styles.headerTitle}>Deeinder</h1> */}
      

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Us</h2>
        <p style={styles.paragraph}>
          Welcome to <strong>Deeinder</strong> — a place where real connections begin. 
          We believe dating should be simple, fun, and honest.
        </p>
        <p style={styles.paragraph}>
          Whether you're looking for love, friendship, or just good conversations, Deeinder is here to bring people together.
        </p>
      </section>

      <footer style={styles.footer}>
        &copy; 2025 Deeinder. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUs;
