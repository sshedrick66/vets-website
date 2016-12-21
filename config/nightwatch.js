/* eslint-disable camelcase, strict */
'use strict';


require('babel-core/register');

const glob = require('glob');

const selenium_server_port = process.env.SELENIUM_PORT || 4444;

module.exports = {
  src_folders: ['./test'],
  output_folder: './logs/nightwatch',
  custom_commands_path: './test/util/nightwatch-commands',
  live_output: false,
  parallel_process_delay: 100,
  disable_colors: false,
  test_settings: {
    'default': {
      launch_url: `localhost:${process.env.WEB_PORT || 3333}`,
      filter: './test/**/*.e2e.spec.js',
      selenium_host: 'localhost',
      selenium_port: selenium_server_port,
      use_ssl: false,
      silent: true,
      output: true,
      screenshots: {
        enabled: false,
        on_failure: true,
        path: 'logs/screenshots'
      },
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        webStorageEnabled: true,
        'phantomjs.binary.path': require('phantomjs-prebuilt').path
        // 'phantomjs.cli.args' : ['--remote-debugger-port=9001', '--remote-debugger-autorun=yes']
      },
      globals: {
        waitForConditionPollInterval: 35,
      },
      selenium: {
        start_process: true,
        server_path:
            glob.sync('./node_modules/selenium-standalone/.selenium/selenium-server/*.jar')[0],
        log_path: './logs/selenium',
        host: '127.0.0.1',
        port: selenium_server_port,
        cli_args: {
        },
      },
      test_workers: {
        enabled: true,
        workers: 10,
      },
    },

    accessibility: {
      filter: './test/accessibility/*.spec.js',
      globals: {
        asyncHookTimeout: 20000,
      },
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        webStorageEnabled: true,
        'phantomjs.binary.path': require('phantomjs-prebuilt').path
      },
      test_workers: {
        enabled: true,
        workers: 4,
      },
    }
  }
};
