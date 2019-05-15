# appium-aws-device-farm

_Node library to schedule Appium test runs on AWS Device Farm_

![npm](https://img.shields.io/npm/v/@fnzc/appium-aws-device-farm.svg)

## Installation

* Use as a node module:

```
npm install --save @fnzc/appium-aws-device-farm
```
or
```
yarn add @fnzc/appium-aws-device-farm
```

* Use as a CLI interface:

```
npm install -g --save @fnzc/appium-aws-device-farm
```
or
```
yarn add global @fnzc/appium-aws-device-farm
```

## Usage


* Use as a node module:

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

* Use as a CLI interface:

**You can use either a JSON file containing all the values or normal CLI options.**
If you provide a JSON file **AND** some options, the options will replace the values provided by the JSON file.
You can also call the command with no options and it will try to load the parameters from a `.aadfconfig.json` file.

```
aadf -i "/somePath/someName.apk" -d "someArn" -a "../appium-tests" -z "/somePath/someName.zip" -D "somArn" -I "/somePath/someName.ipa" -p "someArn" -n "Some Name" -N "Some Name" -s "someArn" -S "someArn" -v
```
or
```
aadf -f someJsonFile.json
```
or
```
aadf -f someJsonFile.json -i "/somePath/someName.apk" -d "someArn"
```
or
```
aadf
```

Help page:

```
Usage: aadf [options]

schedule Appium test runs on AWS Device Farm

Options:
  -V, --version                    output the version number
  -i, --apk_path <path>            Path to the android APK file
  -d, --device_pool_android <arn>  ARN of the AWS Device Pool used for Android tests
  -a, --appium_path <path>         Path to the appium tests folder
  -z, --zip_path <path>            Path where you wish the zip file to be created
  -D, --device_pool_ios <arn>      ARN of the device pool used for iOS tests
  -I, --ipa_path <path>            Path to the iOS IPA file
  -p, --project_arn <arn>          ARN of the AWS Device Farm project
  -n, --name_android_run <name>    Name of the Android test run
  -N, --name_ios_run <name>        Name of the iOS test run
  -s, --spec_android <arn>         ARN of the test spec used for Android tests
  -S, --spec_ios <arn>             ARN of the test spec used for iOS tests
  -v, --verbose                    add more logs during the execution of the script
  -f, --file <file>                JSON file containing the options
  -h, --help                       output usage information

```

## Params

| Param | CLI | Description | Required | Type |
|---|---|---|---|---|
|**`androidAPKPath`**|`-i, --apk_path <path>`|Path to the android APK file|`true` if Android selected|`string`|
|**`androidDevicePoolARN`**|`-d, --device_pool_android <arn>`|ARN of the AWS Device Pool used for Android tests|`true` if Android selected|`string`|
|**`appiumTestFolderPath`**|`-a, --appium_path <path>`|Path to the appium tests folder|`true`|`string`|
|**`appiumTestZipPath`**|`-z, --zip_path <path>`|Path where you wish the zip file to be created|`true`|`string`|
|**`iOSDevicePoolARN`**|`-D, --device_pool_ios <arn>`|ARN of the device pool used for iOS tests|`true` if iOS selected|`string`|
|**`iOSIPAPath`**|`-I, --ipa_path <path>`|Path to the iOS IPA file|`true` if iOS selected|`string`|
|**`projectARN`**|`-p, --project_arn <arn>`|ARN of the AWS Device Farm project|`true`|`string`|
|**`runNameAndroid`**|`-n, --name_android_run <name>`|Name of the Android test run|`true` if Android selected|`string`|
|**`runNameIOS`**|`-N, --name_ios_run <name>`|Name of the iOS test run|`true` if iOS selected|`string`|
|**`testSpecAndroidARN`**|`-s, --spec_android <arn>`|ARN of the test spec used for Android tests|`true` if Android selected|`string`|
|**`testSpecIOSARN`**|`-S, --spec_ios <arn>`|ARN of the test spec used for iOS tests|`true` if iOS selected|`string`|
|**`verbose`**|`-v, --verbose`|Option to add more logs during the execution of the script|`false`|`boolean`|

## [Changelog](https://github.com/fnzc/appium-aws-device-farm/blob/master/CHANGELOG.md)

## Contributing

Pull requests are welcome.

## [License](https://github.com/fnzc/appium-aws-device-farm/blob/master/LICENSE)






