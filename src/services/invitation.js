export const InvitationService = {
  getData() {
    return [{
      "name": "Nguyễn Văn Thành",
      "challenge_name": "Challenge 1",
      "created_at": "20/10/2023",
      
      "type": 'invite',
      "role": 'creator'
    }, {
      "name": "Nguyễn Thị Tâm",
      "challenge_name": "Challenge 6",
      "created_at": "27/08/2023",
      
      "type": 'invite',
      "role": 'member'
    }, {
      "name": "Trần Hải Nam",
      "challenge_name": "Challenge 2",
      "created_at": "25/01/2023",
      
      "type": 'request',
      "role": 'member'
    }, {
      "name": "Thanh Văn Đại",
      "challenge_name": "Challenge 1",
      "created_at": "21/09/2023",
      
      "type": 'invite',
      "role": 'creator'
    }, {
      "name": "Nguyễn Tuấn Anh",
      "challenge_name": "Challenge 4",
      "created_at": "20/06/2023",
      
      "type": 'invite',
      "role": 'member'
    }, {
      "name": "Lê Hải Thanh",
      "challenge_name": "Challenge 4",
      "created_at": "05/02/2023",
      
      "type": 'request',
      "role": 'creator'
    }, {
      "name": "Nguyễn Yến Nhi",
      "challenge_name": "Challenge 6",
      "created_at": "18/03/2023",
      
      "type": 'invite',
      "role": 'creator'
    }, {
      "name": "Đặng Thu Trà",
      "challenge_name": "Challenge 2",
      "created_at": "29/07/2023",
      
      "type": 'request',
      "role": 'member'
    }, {
      "name": "Huỳnh Khải Thơ",
      "challenge_name": "Challenge 2",
      "created_at": "02/12/2023",
      
      "type": 'request',
      "role": 'member'
    }, {
      "name": "Phan Văn Thành",
      "challenge_name": "Challenge 4",
      "created_at": "10/11/2023",
      "type": 'request',
      "role": 'creator'
    }, {
      "name": "Nguyễn Lê Anh",
      "challenge_name": "Challenge 5",
      "created_at": "12/09/2023",
      
      "type": 'invite',
      "role": 'member'
    }, {
      "name": "Lê Văn Diện",
      "challenge_name": "Challenge 3",
      "created_at": "03/07/2023",
            "type": 'request',
      "role": 'creator'
    }, {
      "name": "Nguyễn Quốc Anh",
      "challenge_name": "Challenge 6",
      "created_at": "27/06/2023",
      
      "type": 'invite',
      "role": 'member'
    }, {
      "name": "Nguyễn Thị Kiều Trinh",
      "challenge_name": "Challenge 1",
      "created_at": "28/12/2023",
      
      "type": 'invite',
      "role": 'member'
    }, {
      "name": "Trần Minh Khánh",
      "challenge_name": "Challenge 5",
      "created_at": "10/09/2023",
      
      "type": 'request',
      "role": 'creator'
    }]
  },

  getCustomersMedium() {
      return Promise.resolve(this.getData().slice(0, 50));
  },
};