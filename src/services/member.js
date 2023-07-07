export const MemberService = {
  getData() {
    return [{
      "name": "Nguyễn Văn Thanh",
      "email": "thanhnv@gmail.com",
      "start_day": "20/10/2022",
      
      "amount_day_practice": 8,
      "practice_status": true
    }, {
      "name": "Lại Thế Lộc",
      "email": "loclt@gmail.com",
      "start_day": "27/08/2022",
      
      "amount_day_practice": 21,
      "practice_status": false
    }, {
      "name": "Trần Văn Trung",
      "email": "trungtv@hotmgmail.com",
      "start_day": "25/01/2023",
      
      "amount_day_practice": 13,
      "practice_status": true
    }, {
      "name": "Phạm Lê Hoài Thanh",
      "email": "thanh1282@gmail.com",
      "start_day": "21/09/2022",
      
      "amount_day_practice": 12,
      "practice_status": false
    }, {
      "name": "Thân Hoàng Thịnh",
      "email": "thinh103@gmail.com",
      "start_day": "20/06/2023",
      
      "amount_day_practice": 11,
      "practice_status": true
    }, {
      "name": "Văn Thành Nam",
      "email": "namvt@nam.net",
      "start_day": "05/02/2023",
      
      "amount_day_practice": 2,
      "practice_status": false
    }, {
      "name": "Lê Hải Triều",
      "email": "trieulh@gmail.com",
      "start_day": "18/03/2023",
      
      "amount_day_practice": 28,
      "practice_status": true
    }, {
      "name": "Nguyễn Thị Tâm",
      "email": "congchuabongbong212@gmail.com",
      "start_day": "29/07/2022",
      
      "amount_day_practice": 37,
      "practice_status": false
    }, {
      "name": "Phan Văn Khải",
      "email": "khaidz@gmail.com",
      "start_day": "02/12/2022",
      
      "amount_day_practice": 24,
      "practice_status": false
    }, {
      "name": "Phạm Quang Khôi",
      "email": "khoipq1998@gmail.com",
      "start_day": "10/11/2022",
            "amount_day_practice": 38,
      "practice_status": true
    }, {
      "name": "Nguyễn Lê Phương Thảo",
      "email": "thaophuong19@gmail.com",
      "start_day": "12/09/2022",
      
      "amount_day_practice": 34,
      "practice_status": false
    }, {
      "name": "Lâm Văn Tài",
      "email": "tailv@gmail.com",
      "start_day": "03/07/2022",
            "amount_day_practice": 29,
      "practice_status": true
    }, {
      "name": "Nguyễn Quốc Anh",
      "email": "anhdeptrai@gmail.com",
      "start_day": "27/06/2023",
      
      "amount_day_practice": 0,
      "practice_status": false
    }, {
      "name": "Nguyễn Thị Kiều Trinh",
      "email": "trinhprincess@gmail.com",
      "start_day": "28/12/2022",
      
      "amount_day_practice": 13,
      "practice_status": true
    }, {
      "name": "Trần Minh Khánh",
      "email": "khanhtm@gmail.com",
      "start_day": "10/09/2022",
      
      "amount_day_practice": 34,
      "practice_status": false
    }]
  },

  getCustomersSmall() {
      return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
      return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
      return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
      return Promise.resolve(this.getData());
  },

  getCustomers(params) {
      const queryParams = params
          ? Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
          : '';

      return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
  }
};
