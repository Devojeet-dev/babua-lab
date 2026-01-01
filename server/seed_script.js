fetch('http://localhost:3000/patterns/seed')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
