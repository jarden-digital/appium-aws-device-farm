# appium-aws-device-farm

_Node library to schedule Appium test runs on AWS Device Farm_

![npm](https://img.shields.io/npm/v/@fnzc/appium-aws-device-farm.svg)

## Installation

```
npm install --save @fnzc/appium-aws-device-farm
```
or
```
yarn add @fnzc/appium-aws-device-farm
```

## Usage

```
var appiumDeviceFarm = require('@fnzc/appium-aws-device-farm');

appiumDeviceFarm.launchAppiumTestsDeviceFarm({
  androidAPKPath: path.normalize('/somePath/someName.apk'),
  androidDevicePoolARN: 'arn:aws:devicefarm:us-west-2:xxxxxxxxxxxx:devicepool:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  appiumTestFolderPath: path.normalize('/somePath/appium-tests'),
  appiumTestZipPath: path.normalize('/somePath/AppiumTests.zip'),
  iOSDevicePoolARN: 'arn:aws:devicefarm:us-west-2:xxxxxxxxxxxx:devicepool:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  iOSIPAPath: path.normalize('/somePath/someName.ipa'),
  projectARN: 'arn:aws:devicefarm:us-west-2:xxxxxxxxxxxx:project:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  runNameIOS: 'Name Run iOS',
  runNameAndroid: 'Name Run Android',
  testSpecAndroidARN: 'arn:aws:devicefarm:us-west-2:xxxxxxxxxxxx:upload:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  testSpecIOSARN: 'arn:aws:devicefarm:us-west-2:xxxxxxxxxxxx:upload:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  verbose: true
})
```

## Params

| Param | Description | Required | Type |
|---|---|---|---|
|**`androidAPKPath`**|Path to the android APK file|`true` if Android selected|`string`|
|**`androidDevicePoolARN`**|ARN of the AWS Device Pool used for Android tests|`true` if Android selected|`string`|
|**`appiumTestFolderPath`**|Path to the appium tests folder|`true`|`string`|
|**`appiumTestZipPath`**|Path where you wish the zip file to be created|`true`|`string`|
|**`iOSDevicePoolARN`**|ARN of the device pool used for iOS tests|`true` if iOS selected|`string`|
|**`iOSIPAPath`**|Path to the iOS IPA file|`true` if iOS selected|`string`|
|**`projectARN`**|ARN of the AWS Device Farm project|`true`|`string`|
|**`runNameIOS`**|Name of the iOS test run|`true` if iOS selected|`string`|
|**`runNameAndroid`**|Name of the Android test run|`true` if Android selected|`string`|
|**`testSpecAndroidARN`**|ARN of the test spec used for Android tests|`true` if Android selected|`string`|
|**`testSpecIOSARN`**|ARN of the test spec used for iOS tests|`true` if iOS selected|`string`|
|**`verbose`**|Option to add logs during the execution of the script|`false`|`boolean`|

## [Changelog](https://github.com/fnzc/appium-aws-device-farm/blob/master/CHANGELOG.md)

## Contributing

Pull requests are welcome.

## [License](https://github.com/fnzc/appium-aws-device-farm/blob/master/LICENSE)






