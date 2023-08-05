window.$ = window.jQuery = require('jquery');

import { computePosition, autoUpdate, flip } from '@floating-ui/dom';
window.computePosition = computePosition;
window.autoUpdate = autoUpdate;
window.flip = flip;

require('@fortawesome/fontawesome-free/css/all.css')

require('../plugins/jquery-match-height/jquery.matchHeight-min.js')

require('../css/styles.css')
require('./scripts.js');