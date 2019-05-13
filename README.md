# appium-aws-device-farm
Node library to schedule Appium test runs on AWS Device Farm

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

iOSDevicePoolARN = 'arn:aws:devicefarm:us-west-2:541472778266:devicepool:5c14b96e-4f98-4cce-a335-5971b2ec61db/b1d9b656-cc6f-4b71-aa67-f24d912291bc'
androidDevicePoolARN = 'arn:aws:devicefarm:us-west-2:541472778266:devicepool:5c14b96e-4f98-4cce-a335-5971b2ec61db/230b2130-a477-4776-8aeb-e1ea29fa0fc2'
iOSIPAPath = path.normalize('../output-ios/JoinDirectBroking.ipa')
androidAPKPath = path.normalize('../output-android/app-release.apk')
testSpeciOSARN = 'arn:aws:devicefarm:us-west-2:541472778266:upload:5c14b96e-4f98-4cce-a335-5971b2ec61db/65b12a88-8735-4e72-8f2b-e83064322071'
testSpecAndroidARN = 'arn:aws:devicefarm:us-west-2:541472778266:upload:5c14b96e-4f98-4cce-a335-5971b2ec61db/a675ca00-a3b2-4012-9b8b-96a2576b897b'
projectARN = 'arn:aws:devicefarm:us-west-2:541472778266:project:5c14b96e-4f98-4cce-a335-5971b2ec61db'

'JoinDirectBroking.ipa'
'app-release.apk'
'./AppiumTests.zip'
