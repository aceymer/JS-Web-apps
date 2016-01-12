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
        iconurl: 'http://adrianmejia.com/images/MEAN_jarroba.png',
        title: 'Syllabus for JS Web Apps',
        subtitle: 'Spring 2015',
        education: 'Computer Science',
        course: 'JS Web Apps',
        class: '4th semester, spring 2015',
        lecturer: 'Lars Juul Bilde',
        academy: 'ErhvervsAkademi SydVest',
        weekplans: [{
          week: 4,
          topics: '<p><span class="fr-video fr-dvb" contenteditable="false"><iframe width="640" height="360" src="//www.youtube.com/embed/1EsgeLy_xgI" frameborder="0" allowfullscreen=""></iframe></span><img class="fr-dib" src="http://i.froala.com/assets/photo8.jpg" data-id="8" data-type="image" data-name="Image 2015-12-11 at 21:12:50.jpg" style="width: 300px;"><br></p>'
        }, {
          week: 5,
          topics:  '<a href="https://prezi.com/iuuluefzvf60/week-5-6-js-web-apps-spring-2015/?utm_campaign=share&utm_medium=copy ">Prezi link</a>',
          literature: '<p><span class="fr-video fr-dvb" contenteditable="false"><iframe width="640" height="360" src="//www.youtube.com/embed/1EsgeLy_xgI" frameborder="0" allowfullscreen=""></iframe></span><img class="fr-dib" src="http://i.froala.com/assets/photo8.jpg" data-id="8" data-type="image" data-name="Image 2015-12-11 at 21:12:50.jpg" style="width: 300px;"><br></p>'
        }],
        year: 2015
      })
      .then(() => {
        console.log('finished populating syllabuses');
      });
  });
