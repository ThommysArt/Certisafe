import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const db = new PrismaClient()
    try {
        if (req.method === "PATCH") {
            const employerId = Number(req.query.employerId!)
            const employer = await db.employer.update({
                where: {
                    id: employerId
                },
                data: {
                    phone: req.body.phone
                }
            })
            return res.status(200).send(employer)
        } else if (req.method === "GET") {
            const employerId = Number(req.query.employerId!)
            const employer = await db.employer.findUnique({
                where: {
                    id: employerId
                }
            })
            return res.status(200).send(employer) 
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

