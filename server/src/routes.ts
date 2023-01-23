import { FastifyInstance } from "fastify";
import {prisma} from './lib/prisma'
import { z } from 'zod';
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance) {

  app.get('/', () => {
    return 'Hábitos diários'
  })

  app.get('/habits',  async () => {
    const habits = await prisma.habit.findMany();

    return habits;
  })

  app.post('/habits',  async (req, res) => {
    const createHabityBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    const { title, weekDays } = createHabityBody.parse(req.body);

    const today = dayjs().startOf('day').toDate(); //zera hora

    const habits = await prisma.habit.create({
      data: {
        title,
        created_at: today, //new Date(),
        weekDays: {
          create: weekDays.map(wekDay =>{
            return {
              week_day: wekDay
            }
          })
        }
      }
    });

    return habits;
  })

  app.get('/day', async(req, res) =>{
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(req.query);

    const parseDate = dayjs(date).startOf('day');
    const weekDay = parseDate.get('day');

    //todos hábitos possiveis
    //hábitos que já foram completados

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })?? []

    return { possibleHabits, completedHabits }
  })

  app.patch('/habits/:id/toggle', async (req, res) => {
    const togleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = togleHabitParams.parse(req.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if(!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    /*Buscando se hábito já foi marcado com realizado */
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if(dayHabit) {
      //remove o habito se encontrar com marcado - toggle
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })

    }else{
      //Marcar com realizado hábito do dia
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async() => {
    //[{data: 17/01, amount: 5, completed:1}, {data: 18/01, amount: 2, completed:2}, {...}]

    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day =  cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary
  })
}
