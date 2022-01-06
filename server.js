// lancer l application backend sur le port 3000
const app=require('./backend/app');
app.listen(3000,() => {
console.log('lestenning en port 3000');
})