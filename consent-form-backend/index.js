// consent-form-backend/index.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- Firebase Admin SDK Initialization ---
// Automatic na ning mukha sa `serviceAccountKey.json` nga file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Automatic na sad ni nako gikuha gikan sa imong JSON file
  storageBucket: `${serviceAccount.project_id}.appspot.com` 
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
// -----------------------------------------

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

app.post('/submit', async (req, res) => {
    try {
        const { name, address, provider, imgSrc, signatureData } = req.body;

        const uploadImage = async (base64Data, folder, fileName) => {
            const base64EncodedImageString = base64Data.replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
            
            const file = bucket.file(`${folder}/${fileName}`);
            
            await file.save(imageBuffer, {
                metadata: {
                    contentType: 'image/jpeg',
                },
            });

            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });
            return url;
        };

        const timestamp = Date.now();
        const photoFileName = `${timestamp}-photo.jpg`;
        const signatureFileName = `${timestamp}-signature.jpg`;

        const photoUrl = await uploadImage(imgSrc, 'photos', photoFileName);
        const signatureUrl = await uploadImage(signatureData, 'signatures', signatureFileName);

        const submissionRef = db.collection('submissions').doc(`${timestamp}-${name}`);
        
        await submissionRef.set({
            name,
            address,
            provider,
            photoUrl,
            signatureUrl,
            submittedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('Successfully saved to Firestore and Storage:', name);
        res.status(200).json({ message: 'Submission successful!' });

    } catch (error) {
        console.error("Error during submission:", error);
        res.status(500).json({ message: `Submission failed: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});