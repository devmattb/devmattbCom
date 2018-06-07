import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Import Routes
import { renderRoutes } from './routes.js';

// Import All Collections Client-Side:
import '/imports/api/collections/questions/questions.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
