import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "PATCH") {
            const seekerId = Number(req.query.seekerId!)
            const seeker = await db.seeker.update({
                where: {
                    id: seekerId
                },
                data: {
                    phone: req.body.phone
                }
            })
            return res.status(200).send(seeker)
        } else if (req.method === "GET") {
            const seekerId = Number(req.query.seekerId!)
            const seeker = await db.seeker.findUnique({
                where: {
                    id: seekerId
                }
            })
            return res.status(200).send(seeker) 
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

