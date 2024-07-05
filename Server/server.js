import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Dr_rel",
    password: "Niki@4510",
    port: 5432
});

db.connect();

app.use(cors());

const reactBuildPath = path.join(__dirname, '..', 'Dr_rel_front_end', 'dist');
app.use(express.static(reactBuildPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load train routes from the local JSON file
const trainRoutesPath = path.join(__dirname, 'assets', 'traindetails.json');
app.use('/train-video', express.static(path.join(__dirname, 'assets', 'videos')));


let trainRoutes = {};
try {
    trainRoutes = JSON.parse(fs.readFileSync(trainRoutesPath, 'utf8'));
} catch (error) {
    console.error('Error loading train routes:', error);
}

// Function to get live status from external API with retry logic
const getLiveStatus = async (trainNumber) => {
    const apiUrl = `https://rappid.in/apis/train.php?train_no=${trainNumber}`;
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(apiUrl, { timeout: 5000 });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`API response not ok: ${response.statusText}`);
            }
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`Failed to fetch live status after ${maxRetries} attempts`, error);
                return null; // Return null if all retries fail
            }
        }
    }
};

// Endpoint to fetch train route details and video URL
app.get('/train-details/:trainNumber', async (req, res) => {
    const trainNumber = req.params.trainNumber;
    try {
        const liveStatus = await getLiveStatus(trainNumber);
        if (trainRoutes[trainNumber]) {
            const trainRoute = trainRoutes[trainNumber];
            const videoPath = path.join(__dirname, 'assets', 'videos', `${trainNumber}.mp4`);

            let videoExists = fs.existsSync(videoPath);
            let videoURL = videoExists ? `http://localhost:${PORT}/train-video/${trainNumber}.mp4` : null;

            res.json({
                trainNumber: trainRoute.trainNumber,
                trainName: trainRoute.trainName,
                route: trainRoute.route,
                CoachType: trainRoute.CoachType,
                videoURL: videoURL,
                liveStatus: liveStatus ? {
                    trainName: liveStatus.train_name,
                    message: liveStatus.message,
                    updatedTime: liveStatus.updated_time
                } : {
                    message: 'Live status not available'
                }
            });
        } else {
            res.status(404).json({ error: 'Train details not found' });
        }
    } catch (error) {
        console.error('Error fetching train details:', error);
        res.status(500).json({ error: 'Error fetching train details' });
    }
});

// Endpoint to stream train video
app.get('/train-video/:trainNumber', (req, res) => {
    const trainNumber = req.params.trainNumber;
    try {
        const videoPath = path.join(__dirname, 'assets', 'videos', `${trainNumber}.mp4`);
        if (fs.existsSync(videoPath)) {
            const stat = fs.statSync(videoPath);
            const fileSize = stat.size;
            const videoStream = fs.createReadStream(videoPath);

            // Set headers for video response
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': fileSize,
                'Content-Disposition': `attachment; filename=${trainNumber}.mp4`
            });

            // Pipe video stream to response
            videoStream.pipe(res);
        } else {
            res.status(404).json({ error: 'Video file not found' });
        }
    } catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).json({ error: 'Error streaming video' });
    }
});

//LOCO- DETAILS
app.get('/loco-detail', async (req, res) => {
    const locoNumber = req.query.lono;
    if (!locoNumber) {
      return res.status(400).json({ error: 'Loco number is required' });
    }
  
    try {
      const query = 'SELECT * FROM Engine WHERE loco_no = $1';
      const values = [locoNumber];
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Locomotive not found' });
      }
  
      const locoDetails = result.rows[0];
      res.json(locoDetails);
    } catch (error) {
      console.error('Error fetching locomotive details:', error);
      res.status(500).json({ error: 'Error fetching locomotive details' });
    }
  });
  
  app.post('/loco-post', async (req, res) => {
    const { lono, loclass, lotype, loshed, lostatus, lodesc } = req.body;
    console.log('Received data:', req.body); // Log the received data
  
    try {
      const query = "INSERT INTO Engine (loco_no, loco_class, loco_type, loco_shed, loco_status, loco_desc) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [lono, loclass, lotype, loshed, lostatus, lodesc];
  
      await db.query(query, values);
  
      console.log("Inserted Successfully");
      res.status(200).json({ message: 'Locomotive details inserted successfully' });
    } catch (error) {
      console.error("Error inserting the data: ", error);
      res.status(500).json({ error: 'Error inserting the data' });
    }
  });

//Railfans
app.get('/fan-detail', async (req, res) => {
    const fanplace = req.query.fanno;
    if (!fanplace) {
        return res.status(400).json({error: 'Place name is required'});
    }

    try {
        const query = 'SELECT * FROM railfan WHERE rail_fan_state = $1';
        const values = [fanplace];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Place not Found'});
        }

        const placeDetails = result.rows;
        console.log(placeDetails);
        res.json(placeDetails);
    } catch (error) {
        console.error('Error fetching place details:', error);
        res.status(500).json({error: 'Error fetching place details'});
    }
});

app.post('/fan-post', async (req, res) => {
    const fan_type = req.body.fantype;
    const fan_state = req.body.fanstate;
    const fan_desc = req.body.fandesc;
    try {
        const query = "INSERT INTO railfan VALUES ($1, $2, $3)";
        const values = [fan_type, fan_state, fan_desc];

        await db.query(query, values);

        console.log("Inserted Successfully");
        res.status(200).json({ message: 'Place details inserted successfully' });
    } catch (error) {
        console.error("Error inserting the data: ", error);
        res.status(500).send('Error inserting the data');
    }
});


//Coach Details
app.get('/coach-detail', async (req, res) => {
    const coachtype = req.query.coachno;
    if (!coachtype) {
        return res.status(400).json({error: 'Coach type is required'});
    }

    try {
        const query = 'SELECT * FROM coach WHERE coach_type = $1';
        const values = [coachtype];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Coach not Found'});
        }

        const CoachDetails = result.rows[0];
        res.json(CoachDetails);
    } catch (error) {
        console.error('Error fetching Coach details:', error);
        res.status(500).json({error: 'Error fetching coach details'});
    }
});

app.post('/coach-post', async (req, res) => {
    const co_type = req.body.cotype;
    const co_shed = req.body.coshed;
    const co_desc = req.body.codesc;
    try {
        const query = "INSERT INTO coach VALUES ($1, $2, $3)";
        const values = [co_type, co_shed, co_desc];

        await db.query(query, values);

        console.log("Inserted Successfully");
        res.status(200).json({ message: 'Coach details inserted successfully' });
    } catch (error) {
        console.error("Error inserting the data: ", error);
        res.status(500).send('Error inserting the data');
    }
});



app.get('/', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});