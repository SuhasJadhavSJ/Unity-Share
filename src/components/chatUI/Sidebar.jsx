// import React from 'react';
// import './Sidebar.css';

// function Sidebar({ contacts, onContactClick, activeContact }) {
//   return (
//     <div className="sidebar">
//       {contacts.map((contact, index) => (
//         <div
//           key={index}
//           className={`contact ${contact === activeContact ? 'active' : ''}`}
//           onClick={() => onContactClick(contact)}
//         >
//           <div className="avatar">
//             {/* Placeholder for avatar; replace with image URL if available */}
//           </div>
//           <div className="contact-info">
//             <p className="contact-name">{contact}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Sidebar;
import React, { useEffect, useState } from 'react';
import './Sidebar.css';

function Sidebar({ onContactClick, activeContact }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/user/contacts');  // Endpoint to fetch contacts
        const data = await response.json();
        setContacts(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="sidebar">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`contact ${contact === activeContact ? 'active' : ''}`}
          onClick={() => onContactClick(contact)}
        >
          <div className="avatar">
            {/* Placeholder for avatar; replace with image URL if available */}
            <img src={contact.profilePic} alt={contact.name} />
          </div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
