import express from 'express';
import { message } from './variables';

const app = express();
const port = 3000

app.get('/', (_, res) => {
	res.send(message)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
