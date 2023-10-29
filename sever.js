const express=require('express');
const bodyparser=require('body-parser');
const mysql=require('mysql');
const cors=require('cors');


const app=express();
app.use(bodyparser.json());// chuyen du lieu ve json
app.use(cors());

//
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cinema_booking'

});

db.connect();
//select (get)
app.get('/getMovie',(req,res) => {
    var sql="select * from movie";
    db.query(sql,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);//tra kq ve cho rn
    });
});
//search Movies
app.post('/searchMovie',(req,res)=>{
    var data = req.body.NameMovie
    
    var sql = `SELECT * FROM movie WHERE NameMovie LIKE '%${data}%' `;
    
    db.query(sql,(err, results) => {
        console.log(data)
        if(err) throw err;
        console.log(results);
        res.send(results);
      });

});

app.post('/getMovieDetails',(req,res) => {
    const movieid = req.body.movieid;
    const sql = `SELECT * FROM movie WHERE MovieID = '${movieid}'`;
    
    db.query(sql,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);//tra kq ve cho rn
    });
});


app.post('/login', (req, res) => {
    const { userName, password } = req.body;
  
    // Truy vấn cơ sở dữ liệu để kiểm tra thông tin đăng nhập
    const query = `SELECT * FROM user WHERE UserName = '${userName}' AND Password = '${password}'`;
    db.query(query, (err, results) => {
        console.log(userName, password)
      if (err) {
        console.error('Database query error: ' + err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
        return;
      }
      if (results.length > 0) {
        // Đăng nhập thành công 
        const response = {
          message: 'Đăng nhập thành công',
          results: results // Đối tượng kết quả từ cơ sở dữ liệu
      };
      console.log(response.results);
      res.send(response);
      } else {
        // Đăng nhập thất bại
        res.json({ message: 'Đăng nhập thất bại' });
      }
      
    });
  });

app.post('/register',(req,res)=>{
    const {userName, email, phone, password} = req.body;
    const query = `INSERT INTO user (UserName, Password, email, phone)
    VALUES ('${userName}', '${password}', '${email}', '${phone}');`;
    db.query(query,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);//tra kq ve cho rn
    });
})

app.post('/postTicketData',(req,res)=>{
  const {NumberOfSeats,Timestamp,UserID,ShowID} = req.body;
  const query = `INSERT INTO booking (NumberOfSeats, Timestamp, UserID, ShowID)
  VALUES ('${NumberOfSeats}', '${Timestamp}', '${UserID}', '${ShowID}');`;
  db.query(query,(err,kq)=>{
      if(err) throw err;
      console.log(kq);
      res.send(kq);//tra kq ve cho rn
  });
})
//insert (post)


app.post('/getListTickets',(req,res) => {
  const userID = req.body.userID;
  const sql = `SELECT m.NameMovie, b.Timestamp, b.NumberOfSeats, m.MoviePoster  
  FROM booking b 
  JOIN shows s
  ON b.ShowID=s.ShowID
  JOIN movie m 
  ON s.MovieID=m.MovieID
  WHERE b.UserID ='${userID}'`;
  db.query(sql,(err,kq)=>{
      if(err) throw err;
      console.log(kq);
      res.send(kq);//tra kq ve cho rn
  });
});


//
app.listen(3000,'192.168.1.8',()=>{
    console.log('server dang chay');
});


