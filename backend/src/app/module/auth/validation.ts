import {z} from 'zod'


const googleValidation = z.object({
    code: z.string({message: "code is required"}).trim()
})


export {googleValidation}