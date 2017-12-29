export default function(state=null, action) {
  return [
    {
      name: 'General',
      messages: [
        {
          id: 1,
          author: {
            img: 'https://randomuser.me/api/portraits/men/17.jpg',
            name: 'Jeff Deville'
          },
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo est, dignissim a tincidunt dictum, sagittis et lectus',
          timestamp: 'Dec 27, 2017'
        },
        {
          id: 2,
          author: {
            img: 'https://randomuser.me/api/portraits/men/17.jpg',
            name: 'Jeff Deville'
          },
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo est, dignissim a tincidunt dictum, sagittis et lectus',
          timestamp: 'Dec 27, 2017'
        },
        {
          id: 3,
          author: {
            img: 'https://randomuser.me/api/portraits/men/17.jpg',
            name: 'Jeff Deville'
          },
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo est, dignissim a tincidunt dictum, sagittis et lectus',
          timestamp: 'Dec 27, 2017'
        },
        {
          id: 4,
          author: {
            img: 'https://randomuser.me/api/portraits/men/17.jpg',
            name: 'Jeff Deville'
          },
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse leo est, dignissim a tincidunt dictum, sagittis et lectus',
          timestamp: 'Dec 27, 2017'
        }
      ]
    },
    { name: 'TIL' },
    { name: 'Project 1' },
    { name: 'To Jeff' },
  ]
}
