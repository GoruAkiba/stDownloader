import fetch from "node-fetch";
import _request from "request";
import express from "express";

import {stdownloader} from "./stDownloader.js";
import scriptInfo from "./package.json" assert { type: 'json' };

const app = express();
const engine = new stdownloader();

// web config
const _Port = 3000;

app.get("/", (req,resp) => {
    var {name, version, description} = scriptInfo;
    const data = {
        name,
        version,
        description
    }
    return resp.send(data);
})


app.get("/down", async (req, resp)=>{
    const query = req.query.q;
  
    if(!query) return resp.status(401).json({err:"query invalid"});
    if(!query.includes("streamtape")) return resp.status(401).json({err:"query invalid"});
    
    const download_url = await engine.getDownloadlink(query);
    if(!download_url) return resp.status(500).send({
        msg: "something when wrong"
    });
    return _request(download_url,
      {
        method: "GET",
        headers:{
          range: req.headers.range
        }
      }
    )
    .pipe(resp)
  });


  app.listen(_Port, ()=>{
    console.log("app listening to: ",_Port);
  })

// (async()=>{
//     var url_test = "https://streamtape.com/v/4PRMjYPDqZCKAma"
//     const engine = new stdownloader();

//     var url = await engine.getDownloadlink(url_test);
//     console.log(url);
// })();