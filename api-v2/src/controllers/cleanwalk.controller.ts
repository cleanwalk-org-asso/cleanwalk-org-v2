import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Static } from "@sinclair/typebox";
import { CreateCleanwalkSchema, UpdateCleanwalkSchema } from "../schemas/cleanwalk.schema.js";

const prisma = new PrismaClient();

export async function getCleanwalkById(req: FastifyRequest<{ Params: { cleanwalkId: number } }>, reply: FastifyReply) {
    const cleanwalkId = req.params.cleanwalkId;
    const query = req.query as { user_id?: number };
    const userId = query.user_id ? Number(query.user_id) : undefined;

    const cleanwalk = await prisma.cleanwalk.findUnique({
        where: { id: cleanwalkId },
        include: {
            city: true,
            participants: {
                include: { user: true },
                where: { isHost: true }
            }
        }
    });

    if (!cleanwalk) {
        reply.status(404).send({ message: "Cleanwalk not found" });
        return;
    }

    const participantCount = await prisma.cleanwalkUser.count({ where: { cleanwalkId } });
    let isUserParticipant = false;
    if (userId) {
        const userParticipation = await prisma.cleanwalkUser.findFirst({ where: { cleanwalkId, userId } });
        isUserParticipant = !!userParticipation;
    }

    const host = cleanwalk.participants[0]?.user;

    reply.send({
        id: cleanwalk.id,
        name: cleanwalk.name,
        pos_lat: cleanwalk.posLat,
        pos_long: cleanwalk.posLong,
        date_begin: cleanwalk.dateBegin,
        duration: cleanwalk.duration,
        description: cleanwalk.description,
        address: cleanwalk.address,
        img_url: cleanwalk.imgUrl,
        host: host ? {
            author_id: host.id,
            name: host.name,
            role_id: host.role,
            profilePicture: host.profilePicture
        } : null,
        participant_count: participantCount,
        is_user_participant: isUserParticipant
    });
}

export async function getAllCleanwalks(req: FastifyRequest, reply: FastifyReply) {
    const now = new Date();
    const twoMonthsLater = new Date(now.getTime() + 2 * 30 * 24 * 60 * 60 * 1000);

    const cleanwalks = await prisma.cleanwalk.findMany({
        where: {
            dateBegin: { lte: twoMonthsLater, gte: now },
            participants: { some: { isHost: true } },
        },
        include: {
            city: true,
            participants: {
                include: { user: true },
                where: { isHost: true }
            }
        }
    });

    const cleanwalkData = cleanwalks.map(cw => ({
        id: cw.id,
        name: cw.name,
        pos_lat: cw.posLat,
        pos_long: cw.posLong,
        date_begin: cw.dateBegin,
        duration: cw.duration,
        description: cw.description,
        address: cw.address,
        img_url: cw.imgUrl,
        host: cw.participants[0]?.user ? {
            name: cw.participants[0].user.name,
            role_id: cw.participants[0].user.role,
            profilePicture: cw.participants[0].user.profilePicture
        } : null
    }));

    reply.send(cleanwalkData);
}

export async function checkUserParticipation(req: FastifyRequest<{ Querystring: { user_id?: number; cleanwalk_id?: number } }>, reply: FastifyReply) {
    const { user_id: userId, cleanwalk_id: cleanwalkId } = req.query;

    if (!userId || !cleanwalkId) {
        reply.status(400).send({ message: "User ID and Cleanwalk ID are required" });
        return;
    }

    const participation = await prisma.cleanwalkUser.findFirst({ where: { userId, cleanwalkId } });

    if (participation) {
        reply.send({
            is_participant: true,
            is_host: participation.isHost,
            nb_person: participation.nbPerson
        });
    } else {
        reply.send({ is_participant: false });
    }
}

export async function createCleanwalk(req: FastifyRequest, reply: FastifyReply) {
    const data: Static<typeof CreateCleanwalkSchema> = req.body as Static<typeof CreateCleanwalkSchema>;
    let city = await prisma.city.findFirst({ where: { name: data.city } });
    if (!city) {
        city = await prisma.city.create({ data: { name: data.city } });
    }
    const newCleanwalk = await prisma.cleanwalk.create({
        data: {
            name: data.name,
            posLat: data.pos_lat,
            posLong: data.pos_long,
            dateBegin: data.date_begin,
            duration: data.duration,
            description: data.description ?? "",
            imgUrl: data.img_url,
            address: data.address ?? "",
            cityId: city.id
        }
    });
    await prisma.cleanwalkUser.create({
        data: {
            cleanwalkId: newCleanwalk.id,
            userId: data.user_id,
            nbPerson: 1,
            isHost: true
        }
    });
    reply.status(201).send({ message: "Cleanwalk and host association created successfully" });
}

export async function joinCleanwalk(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as { cleanwalk_id: number; user_id: number; nb_person: number };
    await prisma.cleanwalkUser.create({
        data: {
            cleanwalkId: data.cleanwalk_id,
            userId: data.user_id,
            nbPerson: data.nb_person,
            isHost: false
        }
    });
    reply.status(201).send({ message: "User added to the cleanwalk successfully" });
}

export async function updateCleanwalk(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as { cleanwalkId: number };
    const cleanwalkId = Number(params.cleanwalkId);
    const data: Static<typeof UpdateCleanwalkSchema> = req.body as Static<typeof UpdateCleanwalkSchema>;
    let cityId;
    if (data.city) {
        let city = await prisma.city.findFirst({ where: { name: data.city } });
        if (!city) {
            city = await prisma.city.create({ data: { name: data.city } });
        }
        cityId = city.id;
    }
    const updateData: any = { ...data };
    if (cityId) updateData.city_id = cityId;
    delete updateData.city;
    await prisma.cleanwalk.update({ where: { id: cleanwalkId }, data: updateData });
    reply.send({ message: "Cleanwalk updated successfully" });
}

export async function deleteCleanwalk(req: FastifyRequest<{ Params: {cleanwalkId: number} }>, reply: FastifyReply) {
    const cleanwalkId = req.params.cleanwalkId;
    await prisma.cleanwalk.delete({ where: { id: cleanwalkId } });
    reply.send({ message: "Cleanwalk deleted successfully" });
}

export async function leaveCleanwalk(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as { cleanwalk_id: number; user_id: number };
    await prisma.cleanwalkUser.deleteMany({ where: { cleanwalkId: data.cleanwalk_id, userId: data.user_id } });
    reply.send({ message: "User removed from the cleanwalk successfully" });
}
