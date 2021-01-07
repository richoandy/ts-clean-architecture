# Ts-Clean-Architecture #
## Very simple demonstration on Clean Architecture for Typescript: ##
- Object Oriented
- slim repository, slim delivery, fat usecase
- usecase should not interact with any 3rd party library dependencies
- "only test code that I write"

**stack**:
- Web Framework: *Express (@types/express)*
- ORM: *TypeORM*
- Database: *Mysql*

**To do**:
1. add .env file to run the service
- `PORT=3000`
- `DATABASE_PORT=3306`
- `HOST=localhost`
- `DATABASE=ts-clean-architecture`
- `USERNAME=root`
- `PASSWORD=`
2. create database in mysql named `ts-clean-architecture`
3. create table named `notes` with field id `integer`, title `string`, description `string`
4. command to run: `npm run dev`