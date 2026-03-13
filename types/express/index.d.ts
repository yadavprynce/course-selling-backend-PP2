import type{MyCustomPayload} from "../../src/utils/generateToken"


declare global {
     namespace Express{
        interface Request {
            user? : MyCustomPayload
        }
    }
}