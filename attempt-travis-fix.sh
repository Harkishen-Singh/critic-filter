echo 'attempting to fix travis failures. this does not guarantee fixing of travis though'
eslint . --fix
prettier 'lib/scripts/*.js' --write