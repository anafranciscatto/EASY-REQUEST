import mysql.connector
class Connection:
    def conectar():
        myBD = mysql.connector.connect(
            host = "bd-easy-request.mysql.database.azure.com",
            port = "3306",
            user="equipe",
            password="4_b4t@t45_3_m31@",
            database="bd_easyrequest"
        )

        return myBD