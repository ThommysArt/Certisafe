import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "POST") {
            const seeker = await db.seeker.create({
                data: {
                    userId: req.body.userId,
                    phone: req.body.phone
                }
            })
            return res.status(201).send(seeker)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}