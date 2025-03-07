import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "POST") {
            const user = await db.user.create({
                data: {
                    userId: req.body.userId,
                    name: req.body.name
                }
            })
            return res.status(201).send(user)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}