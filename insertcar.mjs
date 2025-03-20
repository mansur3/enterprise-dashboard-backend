// In a temporary script file
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertData() {
  await prisma.$executeRaw`
    INSERT INTO car_overview (year, car, total_car) VALUES
    (2012, 'Toyota', 44205),
    (1997, 'Mazda', 18387),
    (1985, 'Pontiac', 49582),
    (2013, 'BMW', 23322),
    (2011, 'Jeep', 31331),
    (2006, 'Chevrolet', 30614),
    (2008, 'BMW', 31888),
    (2012, 'Ford', 43482),
    (2000, 'Lexus', 38207),
    (1974, 'Chevrolet', 13975);
  `;
}

insertData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
