import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today? Feel free to ask me anything, and I will do my best to assist you.', type: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
      setLoading(true);  // Set loading to true

      try {
        const response = await axios.post('http://localhost:5000/predict', {
          emails: [input],
        });
        console.log(response);
        const prediction = response.data.predictions[0];
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `The message is classified as: ${prediction}`, type: 'bot' },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Sorry, something went wrong. Please try again later.', type: 'bot' },
        ]);
      } finally {
        setLoading(false);  // Set loading to false
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="bg-gray-950 p-4 shadow-md flex text-center">
        <h1 className="text-2xl font-bold  items-center">Spam Detector</h1>
      </header>
      <main className="flex-1 p-4 overflow-hidden hide-scrollbar">
        <div className="flex flex-col space-y-7 h-full overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-start`}
            >
              <div className="flex items-center ml-52 mt-2">
                {msg.type === 'bot' ? (
                  <FaRobot className="text-gray-300" size={24} />
                ) : (
                  <FaUser className="text-gray-300" size={24} />
                )}
              </div>
              <div
                className={`p-3 rounded-lg w-full ml-10 mr-52 text-left ${msg.type === 'user' ? 'bg-zinc-600 text-white' : ' text-white'
                  } ml-2 break-words`}
              >
                <div className=' mr-6'>
                {msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </main>
      <footer className="p-4">
        <div className='w-full h-0.5 bg-white mb-3'></div>
        <div className="flex justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="w-2/5 p-2 rounded-l-lg bg-gray-100 text-gray-800"
            placeholder="Enter your Email message ..."
          />
          <button
            onClick={handleSend}
            className="bg-gray-500 text-white px-5 rounded-r-lg hover:bg-sky-700"
            disabled={loading}  // Disable button when loading
          >
            {loading ? 'Sending...' : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            }
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaRobot, FaUser, FaGoogle } from 'react-icons/fa';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [authToken, setAuthToken] = useState('');
//   const [emails, setEmails] = useState([]);
//   const endOfMessagesRef = useRef(null);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleGmailLogin = () => {
//     // Logic for Gmail login
//     // Redirect to Google authentication page and get the token
//     window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=https://www.googleapis.com/auth/gmail.readonly`;
//   };

//   const fetchEmails = async () => {
//     if (!authToken) return;
//     setLoading(true);
//     try {
//       const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       const messages = response.data.messages;
//       setEmails(messages);
//       setMessages([{ text: 'Fetching emails...', type: 'bot' }]);
//     } catch (error) {
//       console.error('Error fetching emails:', error);
//       setMessages([{ text: 'Sorry, something went wrong while fetching emails.', type: 'bot' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClassifyEmails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/classify', { emails });
//       const { spamCount, notSpamCount } = response.data;
//       setMessages([
//         { text: `Spam emails: ${spamCount}`, type: 'bot' },
//         { text: `Not Spam emails: ${notSpamCount}`, type: 'bot' }
//       ]);
//     } catch (error) {
//       console.error('Error classifying emails:', error);
//       setMessages([{ text: 'Sorry, something went wrong while classifying emails.', type: 'bot' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white">
//       <header className="bg-gray-950 p-4 shadow-md flex text-center">
//         <h1 className="text-2xl font-bold">Spam Detector</h1>
//       </header>
//       <main className="flex-1 p-4 overflow-hidden hide-scrollbar">
//         <div className="flex flex-col space-y-7 h-full overflow-auto">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-start`}
//             >
//               <div className="flex items-center ml-2 mt-2">
//                 {msg.type === 'bot' ? (
//                   <FaRobot className="text-gray-300" size={24} />
//                 ) : (
//                   <FaUser className="text-gray-300" size={24} />
//                 )}
//               </div>
//               <div
//                 className={`p-3 rounded-lg w-1/3 text-left ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'} ml-2 break-words`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={endOfMessagesRef} />
//         </div>
//       </main>
//       <footer className="p-4">
//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={handleGmailLogin}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//           >
//             <FaGoogle className="inline mr-2" />
//             Login with Gmail
//           </button>
//           <button
//             onClick={fetchEmails}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? 'Fetching Emails...' : 'Fetch Emails'}
//           </button>
//           <button
//             onClick={handleClassifyEmails}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//             disabled={loading}
//           >
//             {loading ? 'Classifying...' : 'Classify Emails'}
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;
