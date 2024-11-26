import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const contactData = { name, email, subject, message };

  //   setIsSubmitting(true);
  //   setSuccessMessage("");
  //   setErrorMessage("");

  //   try {
  //     // Replace with actual API request
  //     const response = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(contactData),
  //     });

  //     if (response.ok) {
  //       setSuccessMessage("Your message has been sent successfully!");
  //       setName("");
  //       setEmail("");
  //       setSubject("");
  //       setMessage("");
  //     } else {
  //       setErrorMessage("There was an error sending your message. Please try again.");
  //     }
  //   } catch (error) {
  //     setErrorMessage("There was an error sending your message. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, email, subject, message };
  
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(contactData),
      });
  
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "There was an error sending your message.");
      }
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="contact-us-page">
      <h2 className="contact-h2">Contact Us</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="contact-us-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="subject">Subject</label>
          <input
            className="input"
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="message">Message</label>
          <textarea
            className="textarea"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          className="btn1"
          type="submit"
          disabled={isSubmitting || !name || !email || !subject || !message}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
