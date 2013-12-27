var fs = require('fs');

exports['generate'] = function(binary, next){

  //////// DOCUMENTS ////////

  var documents = {};

  documents.projectMap = '/\n\
  |- config\n\
  | -- config.js\n\
  | -- environments\n\
  |-- (project settings)\n\
  |\n\
  |- actions\n\
  |-- (your actions)\n\
  |\n\
  |- initializers\n\
  |-- (any additional initializers you want)\n\
  |\n\
  |- log\n\
  |-- (default location for logs)\n\
  |\n\
  |- node_modules\n\
  |-- (your modules, actionHero should be npm installed in here)\n\
  |\n\
  |- pids\n\
  |-- (pidfiles for your running servers)\n\
  |\n\
  |- public\n\
  |-- (your static assets to be served by /file)\n\
  |\n\
  |- servers\n\
  |-- (custom servers you may make)\n\
  |\n\
  |- tasks\n\
  |-- (your tasks)\n\
  |\n\
  readme.md\n\
  routes.js\n\
  gruntfile.js\n\
  package.json (be sure to include \'actionHero\':\'x\')\n\
  ';

  documents.config_js = fs.readFileSync(binary.paths.actionHero_root + '/config/config.js');
  documents.config_production_js = fs.readFileSync(binary.paths.actionHero_root + '/config/environments/production.js');
  documents.package_json = fs.readFileSync(binary.paths.actionHero_root + '/package.json');
  documents.routes_js = fs.readFileSync(binary.paths.actionHero_root + '/routes.js');
  documents.action_status = fs.readFileSync(binary.paths.actionHero_root + '/actions/status.js');
  documents.task_runAction = fs.readFileSync(binary.paths.actionHero_root + '/tasks/runAction.js');
  documents.gruntfile = fs.readFileSync(binary.paths.actionHero_root + '/grunt/actionHero_gruntfile.js');
  documents.public_actionHeroWebSocket = fs.readFileSync(binary.paths.actionHero_root + '/public/javascript/actionHeroWebSocket.js');
  documents.public_actionHeroWebSocketMin = fs.readFileSync(binary.paths.actionHero_root + '/public/javascript/actionHeroWebSocket.min.js');
  documents.public_index = fs.readFileSync(binary.paths.actionHero_root + '/public/index.html');
  documents.public_chat = fs.readFileSync(binary.paths.actionHero_root + '/public/chat.html');
  documents.public_logo = fs.readFileSync(binary.paths.actionHero_root + '/public/logo/actionHero.png');
  documents.public_css = fs.readFileSync(binary.paths.actionHero_root + '/public/css/actionhero.css');

  var AHversionNumber = JSON.parse(documents.package_json).version;

  documents.package_json = '{\n\
    "author": "YOU <YOU@example.com>",\n\
    "name": "my_actionHero_project",\n\
    "description": "",\n\
    "version": "0.0.1",\n\
    "homepage": "",\n\
    "repository": {\n\
      "type": "",\n\
      "url": ""\n\
    },\n\
    "engines": {\n\
      "node": ">=0.8.0"\n\
    },\n\
    "dependencies": {\n\
      \"actionHero\": \"'+AHversionNumber+"\",\n\
      \"grunt\": \"~0.4.2\"\n\
    },\n\
    \"devDependencies\": {},\n\
    \"scripts\": {\n\
      \"start\": \"node ./node_modules/.bin/actionHero start\",\n\
      \"startCluster\": \"node ./node_modules/.bin/actionHero startCluster\",\n\
      \"actionHero\": \"node ./node_modules/.bin/actionHero\",\n\
      \"help\": \"node ./node_modules/.bin/actionHero help\"\n\
    }\n\
  }\n\
  ";

  documents._project_js = 'exports._project = function(api, next){\n\
  // modify / append the api global variable\n\
  // I will be run as part of actionHero\'s boot process\n\
\n\
  next();\n\
}\
';

  documents.readme_md = '# My actionHero Project\nreadme';

  documents.git_ignore = 'log\npids\nnode_modules';

  //////// LOGIC ////////

  binary.log('Generating a new actionHero project...');

  // make directories
  binary.utils.create_dir_safely(binary.paths.project_root + '/actions');
  binary.utils.create_dir_safely(binary.paths.project_root + '/pids');
  binary.utils.create_dir_safely(binary.paths.project_root + '/certs');
  binary.utils.create_dir_safely(binary.paths.project_root + '/config');
  binary.utils.create_dir_safely(binary.paths.project_root + '/config/environments');
  binary.utils.create_dir_safely(binary.paths.project_root + '/initializers');
  binary.utils.create_dir_safely(binary.paths.project_root + '/log');
  binary.utils.create_dir_safely(binary.paths.project_root + '/servers');
  binary.utils.create_dir_safely(binary.paths.project_root + '/public');
  binary.utils.create_dir_safely(binary.paths.project_root + '/public/javascript');
  binary.utils.create_dir_safely(binary.paths.project_root + '/public/css');
  binary.utils.create_dir_safely(binary.paths.project_root + '/public/logo');
  binary.utils.create_dir_safely(binary.paths.project_root + '/tasks');

  // make files
  binary.utils.create_file_safely(binary.paths.project_root + '/.gitignore', documents.git_ignore);
  binary.utils.create_file_safely(binary.paths.project_root + '/config/config.js', documents.config_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/config/environments/production.js', documents.config_production_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/routes.js', documents.routes_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/package.json', documents.package_json);
  binary.utils.create_file_safely(binary.paths.project_root + '/actions/status.js', documents.action_status);
  binary.utils.create_file_safely(binary.paths.project_root + '/tasks/runAction.js', documents.task_runAction);
  binary.utils.create_file_safely(binary.paths.project_root + '/initializers/_project.js', documents._project_js);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/index.html', documents.public_index);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/chat.html', documents.public_chat);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/css/actionhero.css', documents.public_css);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/logo/actionHero.png', documents.public_logo);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/javascript/actionHeroWebSocket.js', documents.public_actionHeroWebSocket);
  binary.utils.create_file_safely(binary.paths.project_root + '/public/javascript/actionHeroWebSocket.min.js', documents.public_actionHeroWebSocketMin);
  binary.utils.create_file_safely(binary.paths.project_root + '/readme.md', documents.readme_md);
  binary.utils.create_file_safely(binary.paths.project_root + '/gruntfile.js', documents.gruntfile);

  binary.log('');
  binary.log('Generation Complete.  Your project directory should look like this:\n' + documents.projectMap);
  binary.log('');
  binary.log('run \'./node_modules/.bin/actionHero start\' to start your server');

  next();

}
