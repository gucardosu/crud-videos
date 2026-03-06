import fastify from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

// Define routes
server.post('/videos', (req, res) => {
    const { title, description, duration } = req.body;

    database.create({
        title: title,
        description: description,
        duration: duration
    });

    return res.status(201).send('Video created!');
});

server.get('/videos', (req, res) => {
    const videos = database.list();
    console.log(videos);

    return (videos);
});

server.put('/videos/:id', (req, res) => {
    const videoId = req.params.id;
    const { title, description, duration } = req.body;

    database.update(videoId, {
        title: title,
        description: description,
        duration: duration
    })

    return res.status(204).send('Video updated!');
});

server.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id;
    
    database.delete(videoId);

    return res.status(204).send('Video deleted!');
});

server.listen ({
    port: 3000
})