import userModel from "../src/models/users";
import subscriptionModel from "../src/models/subscriptions";
import examsModel from "../src/models/exams";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const seed = async () => {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/exgame");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Non connesso a MongoDb");
        process.exit(1);
    }

    try {
        await userModel.deleteMany();
        await subscriptionModel.deleteMany();
        await examsModel.deleteMany();
        console.log("Database pulito con successo");
    } catch(error){
        console.log("Non sono riuscito a eliminare i dati e pulire il db");
        console.error(error);
    }

    try {
        const hashedPassword1 = await bcrypt.hash("password123", 10);
        const hashedPassword2 = await bcrypt.hash("StudPass456", 10);
        const hashedPassword3 = await bcrypt.hash("secure789", 10);

        const newUsers = await userModel.insertMany([
            {
                id: "student_001",
                first_name: "Marco",
                last_name: "Bianchi",
                email: "marco.bianchi@example.com",
                password: hashedPassword1,
                image: "https://i.pravatar.cc/150?img=10",
                createdAt: new Date(),
                updatedAt: new Date(),
                role: "user",
                data: {},
            },
            {
                id: "student_002",
                first_name: "Laura",
                last_name: "Verdi",
                email: "laura.verdi@example.com",
                password: hashedPassword2,
                image: "https://i.pravatar.cc/150?img=20",
                createdAt: new Date(),
                updatedAt: new Date(),
                role: "user",
                data: {},
            },
            {
                id: "student_003",
                first_name: "Giuseppe",
                last_name: "Neri",
                email: "giuseppe.neri@example.com",
                password: hashedPassword3,
                image: "https://i.pravatar.cc/150?img=30",
                createdAt: new Date(),
                updatedAt: new Date(),
                role: "user",
                data: {},
            },
        ]);
        console.log("Utenti creati:", newUsers.length);

        const newExams = await examsModel.insertMany([
            {
                id: "exam_001",
                name: "Quiz di Cultura Generale - Livello Base",
                created_at: new Date(),
                updated_at: new Date(),
                created_by: "admin_001",
                schedule_date: new Date("2025-02-15"),
                max_time: 1800,
                questions: [
                    {
                        question_id: "q_001",
                        text: "Qual è la capitale della Francia",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_001_1", text: "Parigi", is_correct: true },
                            { answer_id: "a_001_2", text: "Lione", is_correct: false },
                            { answer_id: "a_001_3", text: "Marsiglia", is_correct: false },
                            { answer_id: "a_001_4", text: "Nizza", is_correct: false },
                        ],
                    },
                    {
                        question_id: "q_002",
                        text: "Chi ha scritto 'La Divina Commedia'",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_002_1", text: "Dante Alighieri", is_correct: true },
                            { answer_id: "a_002_2", text: "Petrarca", is_correct: false },
                            { answer_id: "a_002_3", text: "Boccaccio", is_correct: false },
                            { answer_id: "a_002_4", text: "Manzoni", is_correct: false },
                        ],
                    },
                    {
                        question_id: "q_003",
                        text: "Qual è il pianeta più vicino al Sole",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_003_1", text: "Mercurio", is_correct: true },
                            { answer_id: "a_003_2", text: "Venere", is_correct: false },
                            { answer_id: "a_003_3", text: "Terra", is_correct: false },
                            { answer_id: "a_003_4", text: "Marte", is_correct: false },
                        ],
                    },
                ],
            },
            {
                id: "exam_002",
                name: "Quiz di Storia e Geografia",
                created_at: new Date(),
                updated_at: new Date(),
                created_by: "admin_001",
                schedule_date: new Date("2025-03-01"),
                max_time: 2400,
                questions: [
                    {
                        question_id: "q_004",
                        text: "In che anno è iniziata la Seconda Guerra Mondiale",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_004_1", text: "1939", is_correct: true },
                            { answer_id: "a_004_2", text: "1914", is_correct: false },
                            { answer_id: "a_004_3", text: "1945", is_correct: false },
                            { answer_id: "a_004_4", text: "1929", is_correct: false },
                        ],
                    },
                    {
                        question_id: "q_007",
                        text: "Qual è la montagna più alta del mondo",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_007_1", text: "Everest", is_correct: true },
                            { answer_id: "a_007_2", text: "K2", is_correct: false },
                            { answer_id: "a_007_3", text: "Kangchenjunga", is_correct: false },
                            { answer_id: "a_007_4", text: "Makalu", is_correct: false },
                        ],
                    },
                ],
            },
            {
                id: "exam_003",
                name: "Quiz di Scienza",
                created_at: new Date(),
                updated_at: new Date(),
                created_by: "admin_001",
                schedule_date: new Date("2025-03-15"),
                max_time: 3000,
                questions: [
                    {
                        question_id: "q_005",
                        text: "Qual è la formula chimica dell'acqua",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_005_1", text: "H2O", is_correct: true },
                            { answer_id: "a_005_2", text: "CO2", is_correct: false },
                            { answer_id: "a_005_3", text: "O2", is_correct: false },
                            { answer_id: "a_005_4", text: "NaCl", is_correct: false },
                        ],
                    },
                    {
                        question_id: "q_008",
                        text: "Quanti sono i pianeti del Sistema Solare",
                        type: "single-choice",
                        answers: [
                            { answer_id: "a_008_1", text: "8", is_correct: true },
                            { answer_id: "a_008_2", text: "7", is_correct: false },
                            { answer_id: "a_008_3", text: "9", is_correct: false },
                            { answer_id: "a_008_4", text: "10", is_correct: false },
                        ],
                    },
                ],
            },
        ]);
        console.log("Esami creati:", newExams.length);

        const newSubscriptions = await subscriptionModel.insertMany([
            {
                _id: "sub_001",
                student_id: "student_001",
                exam_id: "exam_001",
                questions: [
                    { question_id: "q_001", responses: [{ answer_id: "a_001_1" }] },
                    { question_id: "q_002", responses: [{ answer_id: "a_002_1" }] },
                    { question_id: "q_003", responses: [{ answer_id: "a_003_1" }] },
                ],
            },
            {
                _id: "sub_002",
                student_id: "student_002",
                exam_id: "exam_001",
                questions: [
                    { question_id: "q_001", responses: [{ answer_id: "a_001_2" }] },
                    { question_id: "q_002", responses: [{ answer_id: "a_002_1" }] },
                    { question_id: "q_003", responses: [{ answer_id: "a_003_1" }] },
                ],
            },
            {
                _id: "sub_003",
                student_id: "student_003",
                exam_id: "exam_002",
                questions: [
                    { question_id: "q_004", responses: [{ answer_id: "a_004_1" }] },
                    { question_id: "q_007", responses: [{ answer_id: "a_007_1" }] },
                ],
            },
            {
                _id: "sub_004",
                student_id: "student_001",
                exam_id: "exam_003",
                questions: [
                    { question_id: "q_005", responses: [{ answer_id: "a_005_1" }] },
                    { question_id: "q_008", responses: [{ answer_id: "a_008_1" }] },
                ],
            },
        ]);
        console.log("Subscriptions create:", newSubscriptions.length);

        console.log("\n Seed completato!");
        console.log(`- ${newUsers.length} utenti creati`);
        console.log(`- ${newExams.length} esami creati`);
        console.log(`- ${newSubscriptions.length} iscrizioni create`);

    } catch(error){
        console.log("Non sono riuscito a inserire i dati:");
        console.error(error);
    }

    mongoose.connection.close();
    process.exit(0);
};

seed();