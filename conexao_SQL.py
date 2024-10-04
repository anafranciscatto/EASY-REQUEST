import mysql.connector
class Connection:
    def conectar():
        myBD = mysql.connector.connect(
            host = "127.0.0.1",
            user="equipe",
            password="4_b4t@t45_3_m31@",
            database="bd_easyrequest"
        )

        return myBD