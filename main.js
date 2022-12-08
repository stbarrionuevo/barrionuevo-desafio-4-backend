const express = require('express');
const {Router} = express;

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


const products = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
]


const productsRouter = Router();

productsRouter.get('/',(req,res) => {
    res.json(products)});

productsRouter.get('/save',(req,res) => {
    res.json(products)});

productsRouter.post('/save', (req,res) =>{
    console.log(req.body)
    let ID;
    products.length === 0 ? ID = 1 : ID = products[products.length - 1].id + 1;
    const productToAdd = {...req.body , id: ID};
  
        products.push(productToAdd)
   
    res.status(200).json({ added: productToAdd });
})


const productByIdRouter = Router();

productByIdRouter.get('/', (req,res) => {
    try {
        const product = products.find( ele => ele.id === id)
        return  res.json(product)
        ? product
        : null
  
      } catch(err) {
          console.error(`${err} Error: 'Producto NO encontrado`)
      }
    })


app.use('/api/products',productsRouter)
app.use('/api/products/:id', productByIdRouter)


    try{
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))}

    catch(err){
        app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });
}
