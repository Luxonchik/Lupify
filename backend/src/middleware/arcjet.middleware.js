import aj from "../lib/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect"

export const arcjetProtection = async(req, res, next) => {
    try {
        const dicision = await aj.protect(req);
        if(dicision.isDenied()) {
            if(dicision.reason.isRateLimit()) {
                return res.status(429).json({message: "Rate limit exceeded. Please try again later"})
            }
           
        else if(dicision.reason.isBot()) {
                return res.status(403).json({message: "Bot access denied."})
        } else {
            return res.status(403).json({
                message: "Access denied by security policy."
            })        
        }
         }

         if(dicision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected",
            });
         }
    
    } catch (error) {
        console.log("Arcjet Protection Error:", error)
        next()
    }
}