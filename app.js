const express  = require('express');
const db = require('./util/db-connection');
const app  = express();


const productRoutes = require('./routes/productRoutes');


const productModel = require('./models/product');



app.use(express.json());
app.use(express.static('public'));

app.use('/products',productRoutes);


db.sync({force:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log('server is running');
    });
}).catch((err)=>{
    console.log(err);
});
