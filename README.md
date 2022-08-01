# Backend 

* Mongo/Express/POSTMAN

# Instalaciones extras

- Instalamos la libreria para el hash ** npm i bcryptjs **
- Se instala para facilitar configuracion de BD ** npm i mongoose **
- Se instala moment para manejar fechas/horas ** npm i moment **
- Se instala para manejar Token's  ** npm i jsonwebtoken **

# Para loguearse en heroku (desde la consola y primera configuracion) 

- heroku -- version (para saver si ya tenemos heroku y si no instalamos herroku cli que esta en la pagina de heroku)
- heroku login (despliega una web, damos log in y cerramos la web en consola ya estaremos logueados)
- heroku git:remote -a calendar-new2022 (esto esta en la pagina al crear una nueva app e comandos VIDEO 398)
- git push heroku master

# Para ver en consola despues de haber subido a heroku

- heroku logs -n 1000 --tail

# si se hace alguna modificacion para subirlo a heroku

- git status - para ver que archivos estan modificados
- git add .
- git commit -m "actualizando auth.js" - hacemos el commit
- git push heroku master - Para subirlo a heroku

# En heroku lo podemos ver cargado a un servidor externo

    https://calendar-new2022.herokuapp.com/

# Este link lo colocamos en POSTMAN para hacer las pruebas con las diferentes rutas que creamos