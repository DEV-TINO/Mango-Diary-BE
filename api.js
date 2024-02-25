
const API = [{
  name: 'get_all_emoji',
  url: '/emoji/all',
  method: 'GET',
  request: null,
  response: {
    data: [{
        emoji_id: 0, // unique
        emoji_color_type: 'gray',
        emoji_name: 'happy',
        emoji_subtitle: '한줄정보...',
        emoji_image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
      }, {
        emoji_id: 1, // unique
        emoji_color_type: 'color',
        emoji_name: 'happy',
        emoji_subtitle: '한줄정보...',
        emoji_image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
      }
    ]
  }
}, {
  name: 'get_emoji',
  url: '/emoji/:emoji_id',
  method: 'GET',
  request: null,
  response: {
    data: {
      emoji_id: 0, // unique
      emoji_color_type: 'gray',
      emoji_name: 'happy',
      emoji_subtitle: '한줄정보...',
      emoji_image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
    }
  },
}, {
  name: 'get_all_post',
  url: '/post/all',
  method: 'POST',
  request: {
    month: '01', // 01 ~ 12,
    year: '2019', // 2019
  },
  reponse: {
    data: [
      {
        post_id: 0, // unique
        post_date: '03', // 01 ~ 31
        post_emoji_id: 0, // unique
      }
    ]
  }
}, {
  name: 'get_post',
  url: '/post/:post_id',
  method: 'GET',
  request: null,
  response: {
    data: {
      post_id: 0, // unique
      post_year: '2019', // 2019
      post_month: '01', // 01 ~ 12
      post_date: '03', // 01 ~ 31
      post_emoji_id: 0, // unique
      post_content: '내용',
      post_upload_image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
    }
  }
}, {
  name: 'create_post',
  url: '/post/create',
  method: 'POST',
  request: {
    post_year: '2019', // 2019
    post_month: '01', // 01 ~ 12
    post_date: '03', // 01 ~ 31
    post_emoji_id: 0, // unique
    post_content: '내용',
    post_upload_image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
  },
  response: {
    data: {
      suceess: true,
      post_id: 0, // unique
    }
  }
}, {
  name: 'get_statistic',
  url: '/statistic',
  method: 'POST',
  request: {
    month: '01', // 01 ~ 12
    year: '2019', // 2019
  },
  response: {
    data: [
      {
        statistic_rank: 1, // 1 ~ 5
        statistic_emoji_id: 0, // unique
        statistic_count: 0,
        statistic_comment: '한줄정보...',
      }, {
        statistic_rank: 2, // 1 ~ 5
        statistic_emoji_id: 2, // unique
        statistic_count: 0,
        statistic_comment: '한줄정보...',
      }
    ]
  }
}]
