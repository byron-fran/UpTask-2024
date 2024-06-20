import { CorsOptions } from "cors";

export const corsConfig : CorsOptions = {
    origin : function (origin, callback) {
        const whitelist = [process.env.URL_FRONTEND]

        if(whitelist.includes(origin)){
            callback(null, true)
        }
        else{
            callback(new Error('error cors'))
        }

    }
}