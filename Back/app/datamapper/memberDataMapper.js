const router = require('../router/tripRouter');
const client = require('./client');
const tripDataMapper = require('./tripDataMapper')

const memberDataMapper = {
    async getAllMembers() {
        const result = await client.query("SELECT * FROM member");
        return result.rows
    },

    async getMemberById(memberId) {
        console.log(memberId);
        const result = await client.query("SELECT * FROM member WHERE id = $1", [memberId]);
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async getMemberLogin(email) {
        //requêtes en étages
        const result = await client.query("SELECT member.id, member.nickname, member.password, docket.role_name FROM member JOIN docket on docket.id = member.docket_id WHERE email = $1", [email]);
        if (result.rowCount == 0) {
            return null; //adresse mail n'existe pas
        };
        return result.rows[0];
    },

    async createMember(newMember) {
        console.log('2', newMember);
        const result = await client.query("INSERT INTO member(first_name, last_name, nickname, email, password) VALUES ($1, $2, $3, $4, $5)", [
            newMember.first_name,
            newMember.last_name,
            newMember.nickname,
            newMember.email,
            newMember.password
        ])
        return 'Inscription réussie'
    },

    async updateAllMember() {
        // EST-CE VRAIMENT UTILE ?????
    },

    async updateOneMember(memberId, memberInfos) {
        // on vérifie si l'utilisateur a des voyages. 



        const result = await client.query(`UPDATE "member" SET "first_name" = $1,
                                                                        "last_name" = $2,
                                                                        "nickname" = $3,
                                                                        "email" = $4
                                                        WHERE id=$5
                                                        RETURNING *`,
            [memberInfos.first_name,
                memberInfos.last_name,
                memberInfos.nickname,
                memberInfos.email,
                memberId
            ]);
        console.log(result.rows)
        return result.rows[0]
    },

    async updateProfilePhoto(memberId, memberPhotoUrl) {
        const result = await client.query(`UPDATE "member" SET "profile_photo" = $1 WHERE id = $2 RETURNING id, profile_photo`, [memberPhotoUrl, memberId]);
        return result.rows[0]
    },

    async deleteAllMember() {
        //function sql pour supprimer les données des tables
        const result = await client.query("");
    },

    async deleteOneMember(memberId) {
        //function sql pour supprimer les données des tables
        const resultTrip = await client.query(`SELECT * FROM "trip" WHERE "member_id" = $1`, [memberId]);

        if (resultTrip) {

            for (let element of resultTrip.rows) {
                let tripId = element.id;
                await tripDataMapper.deleteOneTrip(tripId);

            }


        };
        await client.query(`DELETE FROM "member" WHERE "id" = $1`, [memberId]);
    },


};

module.exports = memberDataMapper;