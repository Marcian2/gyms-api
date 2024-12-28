import express, {Express} from 'express';

interface RSP {
  message: string;
}
interface Gym {
  id: number;
  name: string;
  address: string;
}

const gyms: Gym[] = [
        {id: 1, name: 'Sala1', address: 'Geller Sandor'},
        {id: 2, name: 'Sala2', address: 'Muncii'},
        {id: 3, name: 'Sala3', address: 'Belsugului'}
]

const app: Express = express();
const port: string = '6969';



app.route('/').get((req, res) => {
  res.status(200).send({
    message: 'Bine ai venit la cel mai blana site de sali'
  } as RSP);
})

app.route('/gyms').get((req, res) => {
  res.status(200).send({
    payload:gyms //cand trimiti info mai mult decat un mesaj
  })
})

app.route('/gyms/:id').get((req, res) => {
  const id= Number(req.params?.id);

  if(!id) {
    res.status(400).send({
      message: 'Esti ghena'
    } as RSP);

    return;
  }

  const result:Gym = gyms.find((gym:Gym)=> gym.id === id)
  // Varianta pe lung a lui implicit return; ^
  // const result2 = gyms.find((gym:Gym)=> {
  //   if (gym.id === id) {
  //     return gym;
  //   }
  // })

  if(!result) {
    res.status(404).send({
      message: 'Nu exista id'
    } as RSP)

    return;
  }
  res.status(200).send({
    payload:result
  })
})

app.route('/gyms/:id').delete((req, res) => {
  const id= Number(req.params?.id);

  if(!id) {
    res.status(400).send({
      message: 'Esti ghena'
    } as RSP);

    return;
  }

  const index=gyms.findIndex((gym:Gym)=>gym.id===id);
  console.log(index)

  if(index===-1) {
    res.status(404).send({
      message:'Nu exista id'
    }as RSP)

    return;
  }

  const deletedlist:Gym[]=gyms.splice(index,1)

  res.status(200).send({
    payload:{
      deleted:deletedlist,
      remaining:gyms

    }
  })
})

app.listen(port, () => {
  console.log(`Listening to port: ${port}. Visit on http://localhost:${port}`);
});
