# Instruction servis-kendaraan-api

1. Setting up mysql server or you can run docker compose with command "docker-compose up -d"
2. Import ServisKendaraan.sql to create database with name "ServisKendaraan"
3. Setting up .env file depends on your mysql server
4. Install all modules with command "npm install"
5. Run migration with command "npx sequelize-cli db:migrate"
6. Run server with command "npm run dev"
7. Import API documentation postman collection (servis_kendaraan.postman_collection.json) to access or testing REST API

POST /api/service (add service data) </br>

Parameter Body : </br>
</br>
{ </br>
    "merk": "Yamaha", </br>
    "motorcycle_type": "V-IXION 2012", </br>
    "owner": "Maverick", </br>
    "service_type": "PERIODIC_SERVICE", </br>
    "complaint": "Keluhan tidak ada", </br>
    "phone_number": "0892372367236", </br>
    "cost": 80000 </br>
}</br>
</br>
GET /api/service (get list all service data or filtered by status)</br>
</br>
Parameter Query String :</br>
</br>
status = new status service ENUM[ WAITING, PROCESSING, DONE ] (optional)</br>
</br>
PUT /api/service/:serviceId/:status (edit service data)</br>
</br>
Paramter URL :</br>
</br>
serviceId = id service (required)</br>
status = new status service ENUM[ WAITING, PROCESSING, DONE ] (required)</br>