var imgs = new imagesCollection(
    [
      { 
        idAttribute: '1',
          nombre: 'galeria 1',
          slug: 'galeria1',
          images : [
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },  
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },  
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', 
              title : 'Image Credit: Maria Kazvan', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', 
              title : 'Image Credit: Colin Wojno', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/03/colin/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            },
            {
              image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', 
              title : 'Image Credit: Brooke Shaden', 
              thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', 
              url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'
            }
          ]
      }
    ]
  );