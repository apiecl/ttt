import express from 'express';
import path from 'path';

const app = express();
const port = 4000;
const __dirname = path.resolve(path.dirname(''));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port);
console.log('Server started at ' + port);