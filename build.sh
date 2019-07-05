#!/bin/sh

if [ ${TRAVIS_BRANCH} == master ]; then
  NUXT_ENV_DESTINATION=production yarn build
else
  yarn build
fi
