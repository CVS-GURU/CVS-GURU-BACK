import mysql.connector


class mySqlDatabase():
    def __init__(self):
        self.my_db = mysql.connector.connect(
            host='localhost',
            user='root',
            passwd='your_password',
            database='your_database')

        self.cur = self.my_db.cursor()

    def create_db(self, sql):
        self.cur.execute(sql)
        self.my_db.commit()

    def select_data(self, sql, value):
        # date = '2016-01-01 00:00:00'
        # self.cur.execute("select * from ARTICLE where DATE_TIME = %s", (date,))
        self.cur.execute(sql, value)
        find_data = self.cur.fetchall()
        return find_data

    def insert_data(self, sql, value):
        # sql = "INSERT INTO ARTICLE(PROVIDER, HREF, TITLE, BODY, THUMBNAIL, RANK, DATE_TIME)" \
        #       "VALUES(%s, %s, %s, %s, %s, %s, %s)"
        #
        # val = ('연합-', '링크-', '타이틀', '바디', '썸네일', '랭크', '2016-01-01 00:00:00')
        self.cur.execute(sql, value)
        self.my_db.commit()

        return self.cur.rowcount

    def update_data(self, sql, value):
        self.cur.execute(sql, value)
        self.my_db.commit()

        return self.cur.rowcount

# for x in my_result:
#   print(x)