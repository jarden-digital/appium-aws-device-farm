#!/usr/bin/env node

const program = require('commander')
const lodash = require('lodash')
const pckg = require('./../package.json')
const run = require('./../scheduleRun')

program
  .version(pckg.version)
  .description('schedule Appium test runs on AWS Device Farm')
  .option('-i, --apk_path <path>', 'Path to the android APK file')
  .option('-d, --device_pool_android <arn>', 'ARN of the AWS Device Pool used for Android tests')
  .option('-a, --appium_path <path>', 'Path to the appium tests folder')
  .option('-z, --zip_path <path>', 'Path where you wish the zip file to be created')
  .option('-D, --device_pool_ios <arn>', 'ARN of the device pool used for iOS tests')
  .option('-I, --ipa_path <path>', 'Path to the iOS IPA file')
  .option('-p, --project_arn <arn>', 'ARN of the AWS Device Farm project')
  .option('-n, --name_android_run <name>', 'Name of the Android test run')
  .option('-N, --name_ios_run <name>', 'Name of the iOS test run')
  .option('-s, --spec_android <arn>', 'ARN of the test spec used for Android tests')
  .option('-S, --spec_ios <arn>', 'ARN of the test spec used for iOS tests')
  .option('-v, --verbose', 'add more logs during the execution of the script')
  .option('-f, --file <file>', 'JSON file containing the options')
  .parse(process.argv)

const params = {
  androidAPKPath: program.apk_path || null,
  androidDevicePoolARN: program.device_pool_android || null,
  appiumTestFolderPath: program.appium_path || null,
  appiumTestZipPath: program.zip_path || null,
  iOSDevicePoolARN: program.device_pool_ios || null,
  iOSIPAPath: program.ipa_path || null,
  projectARN: program.project_arn || null,
  runNameIOS: program.name_ios_run || null,
  runNameAndroid: program.name_android_run || null,
  testSpecAndroidARN: program.spec_android || null,
  testSpecIOSARN: program.spec_ios || null,
  verbose: program.verbose || null
}

function clean(obj) {
  for (const propName in obj) {
    if (obj[propName] === null) {
      delete obj[propName];
    }
  }
  return obj
}

if (program.file || lodash.isEmpty(clean(params))) {
  const cwd = process.cwd()
  let file
  if (!program.file) file = require(`${cwd}/.aadfconfig.json`)
  else file = require(`${cwd}/${program.file}`)
  const endParams = Object.assign({}, file, clean(params))
  run.launchAppiumTestsDeviceFarm(endParams)
} else {
  run.launchAppiumTestsDeviceFarm(params)
}
