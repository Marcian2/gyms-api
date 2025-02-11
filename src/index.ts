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



app.route('/gyms/').post((req,res)=>{
  const {id, name, address} = req.body;
  //check the id to be a number
  if(!id || !name || !address) {
    res.status(400).send({
      message: 'Insert correct id, name and adress.'
    } as RSP);

    return;
  }

  //check id existence
  const index=gyms.findIndex((gym:Gym)=> gym.id===id);
  if (index) {
    res.status(400).send({
      message: `A gym with id ${id} already exists. Please use a unique id.`
    } as RSP);
    return;
  }

  const newGym:Gym = {id, name, address };
  gyms.push(newGym);

  res.status(200).send({
    message:'Gym added succesfully'
  }as RSP);

})

//update la o sala, indexul nu il schimb ca nu vreau 
app.route('/gyms/').put((req,res)=>{
    'Insert the gym s id you want to update and the new name and adress' 
    const {id,name,address}=req.body;
    if(!id || !name || !address) {
      res.status(400).send({
        message: 'Insert correct id, name and adress.'
      } as RSP);
  
      return;
    }

    const index=gyms.findIndex((gym:Gym)=> gym.id=id);
    
    if(index) {
      gyms[index].name=name;
      gyms[index].address=address;
      res.status(200).send({
        message:'Gym updated succesfully'
      }as RSP);
    }
    else
    {
      res.status(400).send({
        message: 'Index not found in the gyms.'
      } as RSP);
      return;
    }

})

app.route('/gyms/').patch((req,res)=>{
  "Insert id of the desired gym you want to patch"
  const id = Number(req.params);
  //check the index etc 
  if(!id)
  {res.status(400).send({
    message: 'Id should be a number'
  } as RSP);

  return;
  }

  const index=gyms.findIndex((gym:Gym)=> gym.id=id)
  
  if(index){
      "Input what do you want to change: 1 for name and 2 for adress accordingly" 
      //aici for the moment las asa cum fac aici desi trebuie putin(foarte tare) modificat ulterior
      const number =Number(req.params);
      if(number === 1){
      "Introdu numele salii"
        const change=String(req.params);
        gyms[index].name=change;
        res.status(200).send({
          message:"Super, s-a dat patch la nume"
        }as RSP)  
      return;}
      else if(number === 2){
        "introdu adresa salii"
        const change=String(req.params);
        gyms[index].address=change;
        res.status(200).send({
          message:"Si mai super, s-a mutat sala"
        }as RSP)
      }
    }
    else{
      res.status(400).send({
        message: 'aparent nu exista indexul in salile existente'
      }as RSP)
    return;}

})

app.listen(port, () => {
  console.log(`Listening to port: ${port}. Visit on http://localhost:${port}`);
});
