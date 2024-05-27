import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Checkpoint = { //Typescript kokios reiksmes turi but
    id: number,
    title: string,
    forPremium: boolean,
    forLogged: boolean,
    sampler: string,
    real_name: string,
    cfg: number,
    negative_prompt: string,
}


const checkpointSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    forPremium: z.boolean(),
    forLogged: z.boolean(),
    sampler: z.string().min(3).max(100),
    real_name: z.string().min(3).max(100),
    cfg: z.number().int().positive(),
    negative_prompt: z.string()
})

const createPostSchema = checkpointSchema.omit({id: true});


const fakeCheckpoints: Checkpoint[] = [ //Fake duombaze
    { id: 1, title: "Realistic", forPremium: true, forLogged: false, sampler: "DPM++ 2M Karras", real_name: "juggernaut_final", cfg: 8, negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d)"},
    { id: 2, title: "Anime", forPremium: false, forLogged: false, sampler: "DPM++ 2M Karras", real_name: "anime_model", cfg: 8, negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d)"}
];

export const checkpointsRoute = new Hono()
    .get("/", async (c) => {
        await new Promise((r) => setTimeout(r, 2000));
        return c.json({checkpoints: fakeCheckpoints});
    })
    .post("/", zValidator("json", createPostSchema), async (c) => {
        const checkpoint = await c.req.valid("json"); //data yra gaunamas is post requesto
        fakeCheckpoints.push({...checkpoint, id: fakeCheckpoints.length+1})
        c.status(201);
        return c.json(checkpoint);
    })
    .get('/total', async (c) => {
        await new Promise((r) => setTimeout(r, 2000));
        const total = fakeCheckpoints.length;
        return c.json({"total" : total});
    })
    .get("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"));
        const checkpoint = fakeCheckpoints.find(checkpoint => checkpoint.id === id);
        if(!checkpoint){
            return c.notFound()
        }
        return c.json(checkpoint)
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"));
        const index = fakeCheckpoints.findIndex(checkpoint => checkpoint.id === id);
        if(index === -1){
            return c.notFound()
        }

        const deletedCheckpoint = fakeCheckpoints.splice(index, 1)[0];
        return c.json({checkpoint: deletedCheckpoint});
    })