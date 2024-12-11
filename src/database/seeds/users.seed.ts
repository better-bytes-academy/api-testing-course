// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import { User, UserRole } from '../../entities/user.entity';
// import * as bcrypt from 'bcrypt';

// export default class CreateUsers implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     const userRepository = connection.getRepository(User);
    
//     // Check if users already exist
//     const existingUsers = await userRepository.find();
//     if (existingUsers.length > 0) {
//       console.log('Users already seeded');
//       return;
//     }

//     const saltRounds = 10;
//     const defaultPassword = await bcrypt.hash('Test123!', saltRounds);

//     const users = [
//       {
//         username: 'admin',
//         password: defaultPassword,
//         email: 'admin@example.com',
//         role: UserRole.ADMIN,
//         isActive: true
//       },
//       {
//         username: 'librarian',
//         password: defaultPassword,
//         email: 'librarian@example.com',
//         role: UserRole.LIBRARIAN,
//         isActive: true
//       },
//       {
//         username: 'user',
//         password: defaultPassword,
//         email: 'user@example.com',
//         role: UserRole.USER,
//         isActive: true
//       }
//     ];

//     for (const userData of users) {
//       const user = userRepository.create(userData);
//       await userRepository.save(user);
//     }

//     console.log('Users seeded successfully');
//   }
// }
