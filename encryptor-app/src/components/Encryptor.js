import React, { useState } from 'react';
import axios from 'axios';

const Encryptor = () => {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [decryptionKey, setDecryptionKey] = useState('');

    const handleEncrypt = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/encrypt', {
                key: key,
                message: message
            });
            setEncryptedMessage(response.data.encrypted_message);
        } catch (error) {
            console.error('Error encrypting message:', error);
        }
    };

    const handleDecrypt = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/decrypt', {
                key: decryptionKey,
                encrypted_message: encryptedMessage
            });
            setDecryptedMessage(response.data.decrypted_message);
        } catch (error) {
            console.error('Error decrypting message:', error);
        }
    };

    return (
        <div>
            <h2>Code_Talkers</h2>
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter encryption key (base64)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <button onClick={handleEncrypt}>Encrypt</button>

            {encryptedMessage && (
                <div>
                    <h3>Encrypted Message:</h3>
                    <p>{encryptedMessage}</p>
                    <button onClick={() => {
                        const userKey = prompt('Enter decryption key (base64):');
                        setDecryptionKey(userKey);
                        handleDecrypt();
                    }}>Decrypt Message</button>
                </div>
            )}

            {decryptedMessage && (
                <div>
                    <h3>Decrypted Message:</h3>
                    <p>{decryptedMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Encryptor;