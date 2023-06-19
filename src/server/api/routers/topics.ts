import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(({ ctx }) => {  
    return ctx.prisma.topic.findMany({
        where: {
            userId: ctx.session.user.id
        },
    });
  }),

  create: protectedProcedure
  .input(z.object({ title: z.string() }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.topic.create({
        data: {
            title: input.title,
            userId: ctx.session.user.id,
        }
    })
  })
})
