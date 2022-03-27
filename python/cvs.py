import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
from bs4 import BeautifulSoup
import mysql_helper


class CVS:
    def __init__(self):
        self.url = 'http://cu.bgfretail.com/product/productAjax.do'
        self.data = {
            'pageIndex': '1',
            'searchMainCategory': '10',
            'searchSubCategory': None,
            'listType': None,
            'searchCondition': 'setA',
            'searchUseYn': None,
            'gdIdx': None,
            'codeParent': '10',
            'user_id': None,
            'search1': None,
            'search2': None,
            'searchKeyword': None
        }
        self.cu_header = {
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
            'Connection': 'keep-alive',
            'Content-Length': '161',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': "_ga=GA1.2.1655550719.1646636623; JSESSIONID=1XYRv93KK4g2hTpbLlJrSyJnK12lJCLR1dHyv2vFJ0Xnlp98Grn2!287085431; _gid=GA1.2.1327091027.1648195372; _gat=1",
            'Host': 'cu.bgfretail.com',
            'Origin': 'http://cu.bgfretail.com',
            'Referer': 'http://cu.bgfretail.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }

    def get_cvs_data(self, cvs_type, page):

        url = self.url
        fetch_params = self.data
        fetch_params['pageIndex'] = page

        if cvs_type == 'CU':
            url = self.url
        elif cvs_type == 'GS25':
            url = ''

        try:
            response = requests.post(url, data=fetch_params, headers=self.cu_header)
            # print(response.status_code)
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            product_info_list = []

            for prod_list in soup.select('.prod_list'):
                name = prod_list.select('.name')[0].text
                price = prod_list.select('.price')[0].text
                price = price.replace(",", "")
                price = price.rstrip('원')
                onclick = str(prod_list.select('.prod_img')[0]['onclick'])
                content_id = onclick[onclick.find('(') + 1: len(onclick) - 2]
                image_path = prod_list.find("img")['src']
                product_info_list.append((name, price, content_id, image_path))

            return product_info_list

        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)


if __name__ == "__main__":
    mysql_database = mysql_helper.mySqlDatabase()
    cvs = CVS()
    product_info_list = cvs.get_cvs_data('1', 'CU')
    # insert logic 추가