const path = require('path')
const fs = require('fs')
const delay = require('delay')
const AWS = require('aws-sdk')
const JSZip = require('jszip')
const shell = require('shelljs')

const devicefarm = new AWS.DeviceFarm({region: 'us-west-2'})

const uploadTestScheduleRun = (resolve, packageArn, devicePoolARN, testSpecARN, runName, params) => {

  const paramsCreateUploadAppium = {
    name: path.basename(params.appiumTestZipPath),
    type: 'APPIUM_NODE_TEST_PACKAGE',
    projectArn: params.projectARN
  }

  devicefarm.createUpload(paramsCreateUploadAppium, async (err, data) => {

    if (err) console.log('--- Create upload appium failed --- ', err, err.stack)
    else {
      const uploadAppiumARN = data.upload.arn
      const uploadAppiumURL = data.upload.url

      if (params.verbose) {
        console.log('--- Appium ARN --- ', uploadAppiumARN, uploadAppiumURL)
        console.log('--- Spec ARN --- ', testSpecARN)
        console.log('--- Project ARN --- ', params.projectARN)
      }

      const paramsScheduleRun = {
        projectArn: params.projectARN,
        appArn: packageArn,
        devicePoolArn: devicePoolARN,
        name: runName,
        test: {
          testSpecArn: testSpecARN,
          type: 'APPIUM_NODE',
          testPackageArn: uploadAppiumARN
        }
      }

      shell.exec(`curl -T ${params.appiumTestZipPath} "${uploadAppiumURL}"`, async (code, stdout, stderr) => {

        if (params.verbose) console.log('--- curl appium tests --- ', stdout, code)

        // Do not remove. Necessary for the files to be fully uploaded
        await delay(10 * 1000)

        // Starts the run
        devicefarm.scheduleRun(paramsScheduleRun, (err, data) => {
          if (err) console.log('--- Schedule run failed --- ', err, err.stack)
          else {
            if (params.verbose) console.log('--- Run data --- ' + runName, data)
            resolve(data)
          }
        })
      })
    }
  })
}

const runSchedule = (params, tgzPath) => {

  return new Promise(((resolve, reject) => {
    try {
      if (fs.existsSync(tgzPath)) {

        if (params.verbose) console.log('--- TGZ exists ---')

        try {
          if (fs.existsSync(params.appiumTestZipPath)) {

            if (params.verbose) console.log('--- ZIP exists ---')

            // Upload the IPA and run iOS
            if (params.iOSIPAPath) {

              const paramsCreateUploadIPA = {
                name: path.basename(params.iOSIPAPath),
                type: 'IOS_APP',
                projectArn: params.projectARN
              }

              devicefarm.createUpload(paramsCreateUploadIPA, (err, data) => {

                if (err) console.log('--- Create upload IPA failed --- ', err, err.stack)
                else {
                  const uploadIPAARN = data.upload.arn
                  const uploadIPAURL = data.upload.url

                  if (params.verbose) {
                    console.log('--- ipa ARN --- ', uploadIPAARN)
                    console.log('--- ipa URL --- ', uploadIPAURL)
                  }

                  shell.exec(`curl -T ${params.iOSIPAPath} "${uploadIPAURL}"`, (code, stdout, stderr) => {
                    if (params.verbose) console.log('--- curl iOS ipa --- ', stdout, code)
                    uploadTestScheduleRun(resolve, uploadIPAARN, params.iOSDevicePoolARN, params.testSpecIOSARN,
                      params.runNameIOS, params)
                  })
                }
              })
            }

            // Upload the APK and run Android
            if (params.androidAPKPath) {

              const paramsCreateUploadAPK = {
                name: path.basename(params.androidAPKPath),
                type: 'ANDROID_APP',
                projectArn: params.projectARN
              }

              devicefarm.createUpload(paramsCreateUploadAPK, (err, data) => {

                if (err) console.log('--- Create upload APK failed --- ', err, err.stack)
                else {
                  const uploadAPKARN = data.upload.arn
                  const uploadAPKURL = data.upload.url

                  if (params.verbose) {
                    console.log('--- apk ARN --- ', uploadAPKARN)
                    console.log('--- apk URL --- ', uploadAPKURL)
                  }

                  shell.exec(`curl -T ${params.androidAPKPath} "${uploadAPKURL}"`, (code, stdout, stderr) => {
                    if (params.verbose) console.log('--- curl Android apk --- ', stdout, code)
                    uploadTestScheduleRun(resolve, uploadAPKARN, params.androidDevicePoolARN, params.testSpecAndroidARN,
                      params.runNameAndroid, params)
                  })
                }
              })
            }
          } else {
            if (params.verbose) console.log('--- ZIP does not exist ---')
          }
        } catch (err) {
          if (params.verbose) console.log('--- ZIP error --- ', err)
          reject(err)
        }
      } else {
        if (params.verbose) console.log('--- TGZ does not exist ---')
      }
    } catch (err) {
      if (params.verbose) console.log('--- TGZ error --- ', err)
      reject(err)
    }
  }))
}

const packageTests = (params, tgzPath) => {

  return new Promise(((resolve, reject) => {

    // Zipping the TGZ
    const zip = new JSZip()
    const tgzPromise = new JSZip.external.Promise((resolve, reject) => {
      fs.readFile(tgzPath, function (err, data) {
        if (err) {
          if (params.verbose) console.log('--- Read file err --- ', err)
          reject(err)
        } else {
          if (params.verbose) console.log('--- Read file ok --- ', data)
          resolve(data)
        }
      })
    })
    zip.file('appium-tests.tgz', tgzPromise)

    // Write the zip
    zip.generateNodeStream({type: 'nodebuffer', streamFiles: true})
      .pipe(fs.createWriteStream(params.appiumTestZipPath))
      .on('finish', () => {
        if (params.verbose) console.log('--- Write zip ok --- ')
        resolve('finish')
      })
  }))
}

const createBundle = (params) => {

  shell.cd(path.normalize(params.appiumTestFolderPath))

  const tgzPath = path.normalize(`${path.basename(params.appiumTestFolderPath)}-1.0.0.tgz`)

  // Installing the dependencies
  shell.exec('npm install', (code, stdout, stderr) => {
    if (stderr) console.log('--- Appium tests npm install failed --- ', stderr)
    else {
      if (params.verbose) console.log('--- Appium tests npm install ok --- ', stdout)

      // Installing npm-bundle and bundling the test folder
      shell.exec('npm install --global npm-bundle', async (code, stdout, stderr) => {
        if (stderr) console.log('--- Install npm-bundle failed --- ', stderr)
        else {
          if (params.verbose) console.log('--- Install npm-bundle ok --- ', stdout)
          shell.exec('npm-bundle', async (code, stdout, stderr) => {
            if (stderr) console.log('--- npm-bundle failed --- ', stderr)
            else {
              if (params.verbose) console.log('--- npm-bundle ok --- ', stdout)
              await packageTests(params, tgzPath)
              runSchedule(params, tgzPath)
            }
          })
        }
      })
    }
  })
}

const launchAppiumTestsDeviceFarm = (params) => {

  // Installing dependencies
  shell.exec('npm install', (code, stdout, stderr) => {
    if (stderr) console.log('--- appium-aws-device-farm npm install failed --- ', stderr)
    else {
      if (params.verbose) console.log('--- appium-aws-device-farm npm install ok --- ', stdout)
      createBundle(params)
    }
  })
}

exports.default = launchAppiumTestsDeviceFarm
