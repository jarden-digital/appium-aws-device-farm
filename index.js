const path = require('path')
const fs = require('fs')
const delay = require('delay')
const AWS = require('aws-sdk')
const child_process = require('child_process')
const JSZip = require('jszip')

const devicefarm = new AWS.DeviceFarm({region: 'us-west-2'})

const appiumZipPath = path.normalize('./AppiumTests.zip')
const iOSDevicePoolARN = 'arn:aws:devicefarm:us-west-2:541472778266:devicepool:5c14b96e-4f98-4cce-a335-5971b2ec61db/b1d9b656-cc6f-4b71-aa67-f24d912291bc'
const androidDevicePoolARN = 'arn:aws:devicefarm:us-west-2:541472778266:devicepool:5c14b96e-4f98-4cce-a335-5971b2ec61db/230b2130-a477-4776-8aeb-e1ea29fa0fc2'
const iOSIPAPath = path.normalize('../output-ios/JoinDirectBroking.ipa')
const androidAPKPath = path.normalize('../output-android/app-release.apk')
const testSpeciOSARN = 'arn:aws:devicefarm:us-west-2:541472778266:upload:5c14b96e-4f98-4cce-a335-5971b2ec61db/65b12a88-8735-4e72-8f2b-e83064322071'
const testSpecAndroidARN = 'arn:aws:devicefarm:us-west-2:541472778266:upload:5c14b96e-4f98-4cce-a335-5971b2ec61db/a675ca00-a3b2-4012-9b8b-96a2576b897b'
const tgzPath = path.normalize('./appium-tests-1.0.0.tgz')
const projectARN = 'arn:aws:devicefarm:us-west-2:541472778266:project:5c14b96e-4f98-4cce-a335-5971b2ec61db'
const appiumZipPath = path.normalize('./AppiumTests.zip')

const paramsCreateUploadIPA = {
  name: 'JoinDirectBroking.ipa',
  type: 'IOS_APP',
  projectArn: projectARN
}

const paramsCreateUploadAPK = {
  name: 'app-release.apk',
  type: 'ANDROID_APP',
  projectArn: projectARN
}

const paramsCreateUploadAppium = {
  name: 'AppiumTests.zip',
  type: 'APPIUM_NODE_TEST_PACKAGE',
  projectArn: projectARN
}

const run = () => {

  return new Promise(((resolve, reject) => {

    // Zipping the TGZ
    const zip = new JSZip()
    const tgzPromise = new JSZip.external.Promise((resolve, reject) => {
      fs.readFile('../appium-tests/appium-tests-1.0.0.tgz', function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    zip.file('appium-tests-1.0.0.tgz', tgzPromise)

    // Write the zip
    zip.generateNodeStream({type: 'nodebuffer', streamFiles: true})
      .pipe(fs.createWriteStream(appiumZipPath))
      .on('finish', () => {
        resolve('finish')
      })
  }))
}

run()

const uploadTestScheduleRun = (resolve, packageArn, devicePoolARN, testSpecARN, runName) => {
  devicefarm.createUpload(paramsCreateUploadAppium, async (err, data) => {
    if (err) console.log(err, err.stack)
    else {
      const uploadAppiumARN = data.upload.arn
      const uploadAppiumURL = data.upload.url

      child_process.execSync(`curl -T ${appiumZipPath} "${uploadAppiumURL}"`)

      console.log('--- Appium ARN --- ', uploadAppiumARN, uploadAppiumURL)
      console.log('--- SPEC ARN --- ', testSpecARN)
      console.log('--- Project ARN --- ', projectARN)

      const paramsScheduleRun = {
        projectArn: projectARN,
        appArn: packageArn,
        devicePoolArn: devicePoolARN,
        name: runName,
        test: {
          testSpecArn: testSpecARN,
          type: 'APPIUM_NODE',
          testPackageArn: uploadAppiumARN
        }
      }

      // Do not remove. Necessary for the files to be fully uploaded
      await delay(10 * 1000)

      // Starts the run
      devicefarm.scheduleRun(paramsScheduleRun, (err, data) => {
        if (err) console.log(err, err.stack)
        else {
          console.log('--- RUN DATA --- ' + runName, data)
          resolve(data)
        }
      })
    }
  })
}

const run = () => {
  return new Promise(((resolve, reject) => {
    try {
      if (fs.existsSync(tgzPath) || true) { // fixme

        console.log('---- TGZ EXISTS ----')

        try {
          if (fs.existsSync("./AppiumTests.zip")) {

            console.log('---- ZIP EXISTS ----')

            // Upload the IPA and run iOS
            devicefarm.createUpload(paramsCreateUploadIPA, (err, data) => {

              if (err) console.log(err, err.stack)
              else {
                const uploadIPAARN = data.upload.arn
                const uploadIPAURL = data.upload.url

                child_process.execSync(`curl -T ${iOSIPAPath} "${uploadIPAURL}"`)

                console.log('--- IPA ARN --- ', uploadIPAARN)
                console.log('--- IPA URL --- ', uploadIPAURL)

                uploadTestScheduleRun(resolve, uploadIPAARN, iOSDevicePoolARN, testSpeciOSARN, 'iOS Smoke run')
              }
            })

            // Upload the APK and run Android
            devicefarm.createUpload(paramsCreateUploadAPK, (err, data) => {

              if (err) console.log(err, err.stack)
              else {
                const uploadAPKARN = data.upload.arn
                const uploadAPKURL = data.upload.url

                child_process.execSync(`curl -T ${androidAPKPath} "${uploadAPKURL}"`)

                console.log('--- APK ARN --- ', uploadAPKARN)
                console.log('--- APK URL --- ', uploadAPKURL)

                uploadTestScheduleRun(resolve, uploadAPKARN, androidDevicePoolARN, testSpecAndroidARN, 'Android Smoke run')
              }
            })
          } else {
            console.log('---- ZIP DOES NOT EXIST ----')
          }
        } catch(err) {
          console.log('---- ZIP ERR ----', err)
          reject(err)
        }
      } else {
        console.log('---- TGZ DOES NOT EXIST ----')
      }
    } catch(err) {
      console.log('---- TGZ ERR ----', err)
      reject(err)
    }
  }))
}

run()






