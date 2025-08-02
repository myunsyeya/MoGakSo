const express = require("express");
const app = express();
const dotenv = require('dotenv');

app.set('port', process.env.NODE_ENV || 3001);

// CORS 설정 추가 (ItHome 프론트엔드에서 접근 허용)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const indexRouter = require("./routes/index");

dotenv.config();

// /api 로 들어오는 요청에 대한 라우터
app.use('/api', indexRouter);

app.listen(app.get('port'), () => {
    console.info('Started on port', app.get('port'));
});