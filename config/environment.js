const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name :'development',
    db:'polling_api_development',
   
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}

    }
    
}

const production = {
    name :'production',
    db:process.env.POLLING_API_DB,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}

    }
}

// module.exports = development;
module.exports = eval(process.env.POLLING_API_ENVIRONMENT)== undefined ? development:eval(process.env.POLLING_API_ENVIRONMENT);