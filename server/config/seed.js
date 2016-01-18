/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Syllabus from '../api/syllabus/syllabus.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
        'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
        'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });

Syllabus.find({}).removeAsync()
  .then(() => {
    Syllabus.createAsync({
        _id: '5677bcec37407aa60754252b',
        academy: 'Business Academy SouthWest',
        iconurl: 'http://adrianmejia.com/images/MEAN_jarroba.png',
        year: 2016,
        title: 'JS Web Apps',
        education: 'Computer Science, 4th semester, Spring',
        lecturer: 'Lars Juul Bilde',
        objectives: 'Learn how to make a MEAN fullstack using JS',
        weekplans: [{
          week: 4,
          topics: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
          literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
          teaser: 'Introduction, get the IDE up and running. Activities and views'
        }, {
          week: 5,
          topics:  '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
          literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
          teaser: 'Introduction, get the IDE up and running. Activities and views'
        }],
      }, {
        _id: '569d2d9b9f72ae8586bdad04',
        academy: 'ErhvervsAkademi SydVest',
        iconurl: 'http://www.canon.dk/Images/Android-logo_tcm81-1232684.png',
        year: 2016,
        title: 'Android Development',
        education: 'Computer Science, 4th semester, Spring',
        lecturer: 'Ole Eriksen',
        objectives: 'Learn how to make a great Android Applications\nImportant stuff'
      })
      .then(() => {
        console.log('finished populating syllabuses');
      });
  });
