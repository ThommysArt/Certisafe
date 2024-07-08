import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "POST") {
            const employer = await db.employer.create({
                data: {
                    userId: req.body.userId,
                    phone: req.body.phone
                }
            })
            return res.status(201).send(employer)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}