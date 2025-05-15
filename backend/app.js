const express = require('express');
const cors = require('cors');
const db = require('./services/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/wandelingen", async (req, res) => {
  try {
      const results = await db("wandelingen");
      res.status(200).json(results);
  }catch{
    res.status(500).json({message: "Internal server error"});
  }
});

app.get("/wandelingen/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const wandeling = await db("wandelingen").where("id", id);
        if(wandeling){
            res.status(200).json(wandeling);
        }else{
            res.status(404).json({message:"Wandeling niet gevonden"});
        }
    }catch{
        res.status(500).json({message:"Internal server error"});
    }
});

app.post("/nieuweWandeling", async (req, res) => {
    const{titel, bestemming, moeilijkheidsgraad, afstand_km, duur, beschrijving} = req.body;


   if(!titel || !bestemming || !moeilijkheidsgraad || !afstand_km || !duur || !beschrijving){
       return res.status(400).json({message:"Vul alle velden in"});
   }
   try{
       const [id] = await db("wandelingen").insert({titel, bestemming, moeilijkheidsgraad, afstand_km, duur, beschrijving});
       res.status(201).json({
           message:"Succesvol toegevoegd",
           id: id
       })
   }catch(error){
       res.status(500).json({message:"Fout bij het toevoegen van de student"});
   }
});

app.put("/updateWandeling/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const{titel, bestemming, moeilijkheidsgraad, afstand_km, duur, beschrijving} = req.body;

    if(!titel || !bestemming || !moeilijkheidsgraad || !afstand_km || !duur || !beschrijving){
        return res.status(400).json({message:"Vul alle velden in"});
    }

    const count = await db("absences")
        .where({id})
        .update({titel, bestemming, moeilijkheidsgraad, afstand_km, duur, beschrijving});

    try {
        if (count === 0) {
            res.status(404).json({error: "Wandeling niet gevonden"});
        }

        const updated = await db("absences").where({id}).first();

        res.status(200).json({
                message: "Wandeling bijgewerkt",
                updated: updated
            }
        );
    }catch(error){
        res.status(500).json({message:"Fout bij het bijwerken van de wandeling"});
    }
});

app.delete("/deleteWandeling/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const deleted = await db("wandelingen").where("id", id).del();
        if(deleted === 0){
            res.status(404).json({message:"Wandeling niet gevonden"});
        }
        res.status(200).json({message:"Wandeling verwijderd"});
    }catch(error){
       res.status(500).json({message:"Internal server error"});
    }
});

app.listen(3333, () => {
console.log("API draait op http://localhost:3333");
});
