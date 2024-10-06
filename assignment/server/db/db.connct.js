import mongoose from "mongoose";

const cosnn = () => {
    console.log("connect") 
}

mongoose.connect("mongodb://localhost:27017",{dbName:"studentdb"}).then(cosnn)

