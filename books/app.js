const express = require('express');
const app = express();
const path = require('path');

// View Engineを設定する
app.set('view engine', 'ejs');

// Staticフォルダー
app.use(express.static(path.join(__dirname, 'public')));

// indexページを表示する
const index = require('./routes/index');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected on port : ${ port }`);
});

app.use('/', index);

module.exports = app;
