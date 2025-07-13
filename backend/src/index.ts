import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import {Candidate} from "./types";
import { pickFive } from "./scorer";

const app = express();

app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

app.options('*', cors());

app.use(fileUpload());
app.use(express.json());

let cached : Candidate[] = [];
let finalFive : Candidate[] = [];

app.post("/upload", (req, res) => {
    console.log('Upload endpoint hit');
    console.log('Request files:', req.files);
    console.log('Request body:', req.body);
    
    if (!req.files || !req.files.file) {
        console.error('No file uploaded or invalid file field');
        return res.status(400).json({ error: 'No file uploaded or invalid file field' });
    }
    
    try {
        const uploadedFile = req.files.file as fileUpload.UploadedFile;
        console.log('Uploaded file info:', {
            name: uploadedFile.name,
            size: uploadedFile.size,
            mimetype: uploadedFile.mimetype
        });
        
        const fileContent = uploadedFile.data.toString('utf8');
        console.log('File content (first 200 chars):', fileContent.substring(0, 200));
        
        const json = JSON.parse(fileContent);
        cached = json as Candidate[];
        finalFive = pickFive(cached);
        
        res.json({
            success: true,
            total: cached.length, 
            chosen: finalFive
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({
            error: 'Error processing file',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

app.get('/candidate', (_, res)=>res.send(cached));
app.get('/final5', (_, res)=>res.send(finalFive));

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`✅ backend running on port ${PORT}`));
