echo 'assuming npm is installed along with eslint globally'
echo 'checking lint standards'
eslint lib/ --color
echo 'prefect linting'
echo 'checking code pretty'
prettier 'lib/scripts/*.js' --check
echo 'perfect prettifying'

echo 'all checks passed'