import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "PATCH") {
            const userId = req.query.userId!.toString()
            const user = await db.user.update({
                where: {
                    userId: userId
                },
                data: {
                    name: req.body.name
                }
            })
            return res.status(200).send(user)
        } else if (req.method === "GET") {
            const userId = req.query.userId!.toString()
            const user = await db.user.findUnique({
                where: {
                    userId: userId
                }
            })
            return res.status(200).send(user) 
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

