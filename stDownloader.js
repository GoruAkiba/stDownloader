import fetch from "node-fetch";
export class stdownloader {
    constructor(){
        this.regex = /document\.getElementById\(\'norobotlink\'\)\.innerHTML \= ([\d a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?]*)\;/;
    }

    async getDownloadlink(_url){
        var raw = await fetch(_url);
        var test_text = await raw.text();
        var url;
        if(this.regex.test(test_text)){
            var queried = this.regex.exec(test_text)[1];
            url = queried? "https:"+eval(queried) : null;
        }

        return url;
    }

}